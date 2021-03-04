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
//
// class OnlineMapping extends Component {
//
// }

function MapPage(props) {
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


  const rgbToHex = (rgb)=> {
    // rgb(x, y, z)
    var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
    var hex = "#";

    for (var i = 0; i < 3; i++) {
      // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
      // 'color[i]' 是数组，要转换成字符串.
      // 如果结果是一位数，就在前面补零。例如： A变成0A
      hex += ("0" + Number(color[i]).toString(16)).slice(-2);
    }
    return hex;
  }

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  const onBasemapChange = mapStyleKey => {
    if (mapStyleKey){
      setMapStyleKey(mapStyleKey);
      dispatch({
        type: 'onlineMapping/resetPageState',
      })
    }
  };
  const onControlsChange = (controlKey) => {
    setControl(_control.update(controlKey, v => !v));
  };
  const onLegendChange = (e) => {
    setLegend(_legend.update(e, v => !v));
  };

  const handleModalCancel = () => {
    dispatch({
      type: 'onlineMapping/setMapSaverModalVisible',
      payload: false,
    });
  };

  const onDataChange = (dataname) => {					//所有数据 显示于footer
    let newArray = new Set(_dataNames);
    if (newArray.has(dataname))
      newArray.delete(dataname);
    newArray.add(dataname);
    setDataNames(newArray);
    let textstring = '';
    for (let item of newArray)
      textstring = textstring + item + '; ';
    document.getElementById('FooterData').innerText = 'Data: ' + textstring + '| ';
  };
  const onLayerChange = (layername, addORdelete) => {	//所有图层 显示于footer
    let newArray = new Set(_layerNames);
    if (newArray.has(layername))
      newArray.delete(layername);
    if (addORdelete)
      newArray.add(layername);
    setLayerNames(newArray);
    let textstring = '';
    for (let item of newArray)
      textstring = textstring + item + '; ';  //1,2,3
    document.getElementById('FooterLayer').innerText = 'Layer: ' + textstring + '| ';
  };
  const onFieldsChange = (geoJson) => {		//将矢量数据的字段名称传递给 TemplatePanel
    if (geoJson === null) return;
    try {
      let fields = new Set();
      let name = Object.keys(geoJson.features[0].properties);
      for (let j = 0; j < name.length; j++)
        fields.add(name[j]);
      setFields(fields);
    }
    catch (err) {
      alert('读取文件失败');
    }
  };

  //判断是否存在该字段、该字段是否为数字属性
  //暂无用
  const findField = function(geoJson, field, callback) {
    let name = Object.keys(geoJson.features[0].properties);
    for (let j = 0; j < name.length; j++)
      if (name[j] === field) {
        let array = new Array();
        let count = 0;
        for (let i in geoJson.features) {
          let obj = Object.values(geoJson.features[i].properties);
          if (obj[j] === '' || obj[j] === null || isNaN(obj[j]))
            count++;			//本字段不是数字的条目数
          else array.push(obj[j]);
        }
        if (array.length > count * 10) {	//确定本字段为数字属性
          /* array.sort(function(num1,num2){
            return num1-num2;
          })	*/					//排序
          callback(true);
          return;
        }
        break;
      }
    callback(false);
  };

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

  const addDataSource = (dataName, geoJson, value) => {
    console.log("geojson", geoJson);
    onFieldsChange(geoJson);
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

      //多面
      // _map.addLayer({
      //   "id": dataName+'-multipolygon',
      //   "source": dataName,
      //   'type': 'fill',
      //   'layout': {
      //     'visibility': 'visible',
      //   },
      //   "paint": {
      //     "fill-color": ["get", 'colors'], /* 填充的颜色 */
      //     "fill-opacity": 0.4      /* 透明度 */
      //   },
      //   "filter": ["==", "$type", "MultiPolygon"]
      // });

        // onDataChange(dataName);
      alert('成功添加数据');
    }
    catch (err) {
      console.log(err);
      alert('添加数据失败');
    }
  };
  const addData = (layer) => {
    console.log("layer json", layer);
    let dataName = layer.name;
    let dataFormat =  layer.type;
    let fileStr = layer.path;
    let jsonData = layer.jsonData;
    // if (fileStr === null) return;
    if (!_map) return;
    if (_map.getSource(dataName)) {
      alert('数据已存在，请修改数据名');
      return;
    }
    if (dataFormat === 'json') {
      try {
        let feature;
        let flag = 1, min = 1, max = 0;
        let temp;
        if(layer.value){
          for(let i = 0;i<jsonData.features.length;i++){
            feature = jsonData.features[i];
            if(!parseFloat(feature.properties[layer.value])){
              // flag = 0;
            }
            else{
              temp = parseFloat(feature.properties[layer.value]);
              if(temp>max){
                max = temp;
              }
              else if(temp<min){
                min = temp;
              }
            }
          }
          for(let i = 0;i<jsonData.features.length;i++){
            feature = jsonData.features[i];
            temp = parseFloat(feature.properties[layer.value]);
            if(flag){
              let color = 255*(temp-min)/(max-min);
              let rgb = "rgb("+color.toString()+",0," + (255-color).toString() +")";
              let hex = rgbToHex(rgb);
              console.log("rgb hex",rgb, hex);
              feature.properties[layer.value] = temp;
              feature.properties['colors'] = hex;
              feature.properties['UniqueIdd'] = i;
            }
            else{
              feature.properties['colors'] = "#4682B4";
            }
            jsonData.features[i] = feature;
          }
          let layerOnColormap = props.onlineMapping.layerOnColormap;
          layerOnColormap.jsonData = jsonData;
          dispatch({
            type: 'onlineMapping/setLayerOnColormap',
            payload: layerOnColormap,
          });
        }
        else{
          for(let i = 0;i<jsonData.features.length;i++){
            feature = jsonData.features[i];
            feature.properties['UniqueIdd'] = i;
            feature.properties['colors'] = "red";
            jsonData.features[i] = feature;
          }
          let layerOnColormap = props.onlineMapping.layerOnColormap;
          layerOnColormap.jsonData = jsonData;
          dispatch({
            type: 'onlineMapping/setLayerOnColormap',
            payload: layerOnColormap,
          });
        }
        addDataSource(dataName, jsonData);
      } catch (err) {
        console.log(err);
        alert('Json文件解析失败');
      }
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

}))(MapPage);
