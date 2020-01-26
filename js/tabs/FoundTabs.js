import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import store from '../store/index';
import {onThemeChange} from '../store/action/theme/index';
import {connect} from 'react-redux';
import axios from '../axios/index.js';
import Message from '../components/MessageItem';
import { messageList } from '../https';
class FoundTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576863984509&di=94ee55cbbedfed014002888c43aceaa4&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8435e5dde71190ef7db6dd20cb1b9d16fcfa60fb.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576864005759&di=8bd78c0dea41154f43b83fdaf5dfd860&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F3bf33a87e950352a0d68994e5843fbf2b2118b6f.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576864082119&di=503b72145cc7018b3416721acdb15be6&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn16%2F282%2Fw640h442%2F20180507%2Facce-hacuuvu4799147.jpg',
      ],
      qingqiu: '未请求',
      data: []
    };
  }
  UNSAFE_componentWillMount() {
    this.getList();
  }
  getList = () => {
    axios.get(messageList).then(res => {
      res.data.result.data.map(item => {
        item.type = item.author_name
        item.time = this.timeChange(item.date)
        item.image = item.thumbnail_pic_s
        item.comments = item.category
        item.id = item.uniquekey
      })
      this.setState({
        data: res.data.result.data
      })
    });
  }
  listShow() {
    let data = this.state.data
    const list = data.map((item,index) => {
      return <Message onPress={()=>{this.openDetail(item)}} key={index} data={item} />
    })
    return list
  }
  openDetail = (item)=> {
    console.log(this.props)
    console.log(item)
    NavigationUtil.goPage(
      {
        navigation: this.props.navigation,
      },
      'DetailPage',
    );
  }
  timeChange(date) {
    const time = new Date().getTime() - new Date(date).getTime();
    const minutes = Math.floor(time/1000/60);
    if(minutes < 60) {
      return minutes + '分钟前';
    }else if(minutes < 60*24) {
      return minutes + '小时前';
    }else if(minutes <60*24*30) {
      return minutes + '天前';
    }else{
      return date
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.swiper}>
            <Image
              style={styles.image}
              source={{
                uri: this.state.imageList[0],
              }}
            />
          </View>
          <Text
            onPress={() => {
              NavigationUtil.goPage(
                {
                  navigation: this.props.navigation,
                },
                'DetailPage',
              );
            }}>
            跳转到详情页
          </Text>
          <Text
            onPress={() => {
              let color = 'red';
              if (this.props.themeState === 'red') {
                color = '#0080FF';
              }
              this.props.onThemeChange(color);
            }}>
            切换导航栏颜色
          </Text>
          <Text
            onPress={() => {
              axios.get('http://www.mockhttp.cn/mock/TwinkleDing').then(res => {
                console.log(res);
                this.setState({qingqiu: res.data});
                console.log(this);
              });
            }}>
            请求
          </Text>
          <Text>{this.state.qingqiu}</Text>
          <View style={{width:'100%'}}>{this.listShow()}</View>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {
  return {
    themeState: store.getState().theme.theme,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
  };
}
const ChangeThemeColorPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  // 注意：这里千万要写上这句话，否则用了Redux后的组件是无法使用ref获取该组件的
  {forwardRef: true},
)(FoundTab);
export default ChangeThemeColorPageContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    overflow: 'scroll'
  },
  swiper: {
    height: 200,
    width: '100%',
    backgroundColor:'transparent'
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
