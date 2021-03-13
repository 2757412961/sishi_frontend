import React, { useState, useEffect, Component } from 'react';
import ReactMapboxGl, {
  RotationControl,
  ScaleControl,
  MapContext,
  ZoomControl,
} from 'react-mapbox-gl';
import { Layout, Typography } from 'antd';
import styles from './index.less';
import { fromJS } from 'immutable';
import 'mapbox-gl/dist/mapbox-gl.css';
import { connect } from 'dva';
import axios from 'axios';
import { getLocalData } from '@/utils/common.js';

const { Content, Footer } = Layout;
const { Text } = Typography;

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid2F0c29ueWh4IiwiYSI6ImNrMWticjRqYjJhOTczY212ZzVnejNzcnkifQ.-0kOdd5ZzjMZGlah6aNYNg';
const basemapStyle = {
  'light': 'mapbox://styles/mapbox/light-v10',
  'dark': 'mapbox://styles/mapbox/dark-v10',
  'satellite': 'mapbox://styles/mapbox/satellite-v9',
  'outdoors': 'mapbox://styles/mapbox/outdoors-v11',
  'street': 'mapbox://styles/mapbox/streets-v11',
};
const MapboxMap = ReactMapboxGl({ accessToken: MAPBOX_TOKEN, attributionControl: false, preserveDrawingBuffer: true,
  transformRequest:(url, resourceType)=> {
    if((url.indexOf('renderStyle')>=0 || url.indexOf('tileV3')>=0)&& getLocalData({ dataName: 'rzpj' })) {
      console.log("url re1", url);
      let str = '{"rzpj":"'+getLocalData({ dataName: 'rzpj' })+'"}';
      console.log("url re2", url, str);
      let rzpj = JSON.parse(str);
      console.log("url re", url, str, rzpj);
      return {
        url: url,
        headers: rzpj
        // getLocalData({ dataName: 'rzpj' }),
        // credentials: 'include',
      }
    }
  }
});


function MapPageMap(props) {
  const [_collapsed, setCollapsed] = useState(false);
  const [_mapStyleKey, setMapStyleKey] = useState('light');
  const [_layerNames, setLayerNames] = useState([]);
  const [_dataNames, setDataNames] = useState([]);
  const initialControl = fromJS({ 'rotation': false, 'scale': false, 'zoom': false });
  const [_control, setControl] = useState(initialControl);
  const initialLegend = fromJS({ 'discrete': false, 'continuous': false });
  const [_legend, setLegend] = useState(initialLegend);
  const [_map, setMap] = useState(null);
  const map_ref = React.useRef(null);
  const { dispatch } = props;
  const [geojsonFields, setFields] = useState(new Set());
  const [_nav, setNav] = useState(null);//用于记录是否跳转到制图图层

  //在渲染前先remove掉该图层已有的
  const removeType = (layerName, type) =>{
    if (_map.getLayer(layerName + '-' + type)) {
      _map.removeLayer(layerName + '-' + type);
    }
  }
  const removeLayerByType = (layerName) =>{
    removeType(layerName, 'polygon');
    removeType(layerName, 'multipolygon');
    removeType(layerName, 'point');
    removeType(layerName, 'linestring');
    removeType(layerName, 'polygonClick');
    removeType(layerName, 'multipolygonClick');
    removeType(layerName, 'pointClick');
    removeType(layerName, 'linestringClick');
    removeType(layerName, 'cluster');
    removeType(layerName, 'unclustered');
    removeType(layerName, 'cluster-count');
    removeType(layerName, 'heat');
    removeType(layerName, 'symbol');
    removeType(layerName, 'tiff');
    removeType(layerName, 'tms');
    removeType(layerName, 'polygonFilter');
    removeType(layerName, 'multipolygonFilter');
    removeType(layerName, 'pointFilter');
    removeType(layerName, 'linestringFilter');
  }

  //添加symbol
  const renderSymbol = (layer) =>{
    if (!_map) return;

    removeLayerByType(layer.name);
    _map.removeSource(layer.name);
    // deleteLayer(layer.name,'csv');
    if(layer.type=='csv'){
      _map.addSource(layer.name, {
        'type': 'geojson',
        'data': layer.jsonNow,
      });
    }
    else if(layer.type=='json'){
      _map.addSource(layer.name, {
        'type': 'geojson',
        'data': layer.jsonData,
      });
    }

    try{
      // _map.loadImage("https://fuxi.obs.cn-north-4.myhuaweicloud.com/icons/aerialway-15.svg", function(error, image) {
      //   if (error) throw error;
      //   _map.addImage('aerialway', image);
      _map.addLayer({
        "id": layer.name + "-symbol",
        "type": "symbol",
        "source": layer.name,
        "layout": {
          "icon-image": layer.symbol.icon+"-15",
          "icon-size": ["get", 'symbolRadius'],
          "icon-allow-overlap": true,
          // "icon-color": "#202",
          "visibility": "visible"
        },
        'paint': {
          // 'text-color': '#202',
          // 'icon-halo-color': '#ff0000',
          // 'icon-halo-width': 2,
          // "icon-color": "#ff0000"
        },
        // });
      });
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteLayer = (layerName, template) => {		//删除图层
    if (!_map) return;
    console.log("_map", _map);
    if(_map.getSource(layerName)){
      removeLayerByType(layerName);
    }
    _map.removeSource(layerName);
    let legends = props.mapViewForOnlineMapping.legends;
    legends.splice(legends.findIndex(item=>item.layer.id == layerName),1);
    console.log("legendsss", legends);
    dispatch({
      type:"mapViewForOnlineMapping/setLegends",
      payload:legends,
    })
  };

  //显隐图层时，区分不同类型的图层
  const setVisible = (layerName, type) => {
    if (_map.getLayer(layerName + '-' + type)) {
      var visibility = _map.getLayoutProperty(layerName + '-' + type, 'visibility'); /* getLayoutProperty(layer, name) 返回指定style layer上名为name的layout属性的值*/
      if (visibility === 'visible') {
        _map.setLayoutProperty(layerName + '-' + type, 'visibility', 'none'); /* setLayoutProperty(layer, name, value)设置指定layer上名为name的layou属性的值 */
      } else {
        _map.setLayoutProperty(layerName + '-' + type, 'visibility', 'visible');
      }
    }
  }

  const visibleLayer = (layerName, template) => {		//显隐图层
    if (!_map) return;
    console.log("_map", _map);
    setVisible(layerName, 'polygon');
    setVisible(layerName, 'mutipolygon');
    setVisible(layerName, 'point');
    setVisible(layerName, 'linestring');
    setVisible(layerName, 'tiff');
    setVisible(layerName, 'tms');
    setVisible(layerName, 'polygonClick');
    setVisible(layerName, 'multipolygonClick');
    setVisible(layerName, 'pointClick');
    setVisible(layerName, 'linestringClick');
    setVisible(layerName, 'cluster');
    setVisible(layerName, 'unclustered');
    setVisible(layerName, 'cluster-count');
    setVisible(layerName, 'heat');
    setVisible(layerName, 'symbol');
    setVisible(layerName, 'polygonFilter');
    setVisible(layerName, 'multipolygonFilter');
    setVisible(layerName, 'pointFilter');
    setVisible(layerName, 'linestringFilter');

    let legends = props.mapViewForOnlineMapping.legends;

    for(let i = 0;i<legends.length;i++){
      if(legends[i].layer.id == layerName){
        legends[i]['show'] = !legends[i]['show'];
      }
    }
    console.log("legendsss", legends);
    dispatch({
      type:"mapViewForOnlineMapping/setLegends",
      payload:legends,
    })

  };

  const addData = (dataName, geoJson, value) => {
    console.log("geojson", geoJson);
    try {
      _map.addSource(dataName, {
        'type': 'geojson',
        'data': geoJson,
      });
      //点
      _map.addLayer({
        "id": dataName+"-point",
        "source": dataName,
        "type": "circle",
        'layout': {
          'visibility': 'visible',
        },
        "paint": {
          "circle-radius": 6,        /* 圆的直径，单位像素 */
          "circle-color": ["get", 'colors'],
          // "circle-color": "#bc2200",
        },
        "filter": ["==", "$type", "Point"],
        // "filter": ['has', 'num'],
      });
      //线
      _map.addLayer({
        "id": dataName+"-linestring",
        "source": dataName,
        "type": "line",
        'layout': {
          'visibility': 'visible',
        },
        "paint": {
          "line-color": ["get", 'colors'],
          "line-width": 8
        },
        "filter": ["==", "$type", "LineString"]
      });
      //面
      _map.addLayer({
        "id": dataName+'-polygon',
        "source": dataName,
        'type': 'fill',
        'layout': {
          'visibility': 'visible',
        },
        "paint": {
          "fill-color": ["get", 'colors'], /* 填充的颜色 */
          "fill-opacity": 0.9      /* 透明度 */
        },
        "filter": ["==", "$type", "Polygon"]
      });
      alert('成功添加数据');
    }
    catch (err) {
      console.log(err);
      alert('添加数据失败');
    }
  };

  useEffect(() => {
    if (_map) {
      setTimeout(function() {
        _map.resize();
      }, 200);
    }
  }, [_collapsed, _map]);

  useEffect(() => {
    if(props.leftNavData != _nav){
      if (_map) {
        setTimeout(function() {
          _map.resize();
        }, 200);
      }
      setNav(props.leftNavData);
    }
  }, [props.leftNavData, _map, _nav]);


  return (
    <Layout className={styles.normal}>
      <Layout>
        <Content>
          <div className={styles.mapContainer} ref={map_ref} id="onlineMapping">
            <MapboxMap
              style={basemapStyle[_mapStyleKey]}
              containerStyle={{ height: '100vh', width: '100vw' }}
            >
              {_control.get('rotation') && <RotationControl/>}
              {_control.get('scale') && <ScaleControl/>}
              {_control.get('zoom') && <ZoomControl/>}
              <MapContext.Consumer>
                {map => {
                  setMap(map);
                }}
              </MapContext.Consumer>
            </MapboxMap>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default connect(({  }) => ({

}))(MapPageMap);
