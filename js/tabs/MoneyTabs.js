import React, {Component} from 'react';
import {
  View,
  Text,
  PanResponder,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  ToastAndroid,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../components/Icon/MyIcon';
import styles from '../css/MoneyTabs';
export default class Moneys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showYear: new Date().getFullYear(),
      showMonth: new Date().getMonth() + 1,
      showDay: new Date().getDate(),
      newData: false,
    };
  }
  openMenu = () => {
    this.props.navigation.openDrawer();
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Icon onPress={this.openMenu} name={'home'} size={26} />
          <Text style={styles.titleText}>记账本</Text>
          <Icon name={'more'} size={23} />
        </View>
        <View style={styles.content}>
          <Time timeShow={this} />
          <ListMoney timeShow={this} />
          <Icon
            onPress={() => {
              this.setModalVisible(true);
            }}
            name={'newAdd'}
            size={80}
            style={styles.newAdd}
          />
        </View>
        <MonetModal parent={this} />
      </View>
    );
  }
}

class ListMoney extends Component {
  constructor(props) {
    super(props);
    let year = this.props.timeShow.state.showYear;
    let month = this.props.timeShow.state.showMonth;
    let day = this.props.timeShow.state.showDay;
    this.state = {
      time: `${year}-${month}-${day}`,
      list: [],
      newData: false,
    };
  }
  UNSAFE_componentWillMount() {
    this.lists();
    this.list = () => {
      let data = this.state.list;
      data.map((item, index) => {
        item.key = index.toString();
      });
      if (data.length) {
        let totals = data.reduce((total, num) => {
          return (total += Number(num.money));
        }, 0);
        return (
          <View style={styles.list}>
            <View style={styles.moneyListTitle}>
              <View style={styles.moneyListItem}>
                <Text style={styles.moneyListText}>合计</Text>
                <Text style={styles.moneyListText}>{totals}</Text>
              </View>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={this.deleteMoneyAlert}>
                <Text>删除这天的</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <View style={styles.moneyList} key={item.key}>
                    <View style={styles.moneyListItem}>
                      <Text style={styles.moneyListText}>啥时候:</Text>
                      <Text style={styles.moneyListText}>{item.time}</Text>
                    </View>
                    <View style={styles.moneyListItem}>
                      <Text style={styles.moneyListText}>干啥了:</Text>
                      <Text style={styles.moneyListText}>{item.moneyName}</Text>
                    </View>
                    <View style={styles.moneyListItem}>
                      <Text style={styles.moneyListText}>多少钱:</Text>
                      <Text style={styles.moneyListText}>{item.money}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        );
      } else {
        return <Text>还没有花钱</Text>;
      }
    };
  }
  deleteMoneyAlert = () => {
    Alert.alert(
      '提示',
      '确定要删除今天的记录？？？',
      [
        {
          text: '算了算了',
          onPress: () => {
            ToastAndroid.show(
              '不删了不删了',
              ToastAndroid.CENTER,
              ToastAndroid.SHORT,
            );
          },
          style: 'cancel',
        },
        {
          text: '删就删了',
          onPress: () => {
            this.deleteMoney();
            ToastAndroid.show(
              '真删了啊',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          },
        },
      ],
      {cancelable: false},
    );
  };
  deleteMoney = async () => {
    try {
      await AsyncStorage.removeItem(this.state.time);
      await this.lists();
    } catch (err) {
      console.log(err);
    }
  };
  lists = async () => {
    try {
      const valueData = await AsyncStorage.getItem(this.state.time);
      if (valueData != null) {
        let data = JSON.parse(valueData);
        console.log('获取成功');
        this.setState({
          list: data,
        });
      } else {
        console.log('获取失败');
        this.setState({
          list: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  UNSAFE_componentWillReceiveProps() {
    let year = this.props.timeShow.state.showYear;
    let month = this.props.timeShow.state.showMonth;
    let day = this.props.timeShow.state.showDay;
    let time = `${year}-${month}-${day}`;
    if (this.props.timeShow.state.newData) {
      this.props.timeShow.setState({
        newData: false,
      });
      this.setState(
        {
          time: time,
        },
        () => {
          this.lists();
        },
      );
    }
  }
  render() {
    return this.list();
  }
}
class MonetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moneyName: '',
      money: '',
    };
  }
  onChangeText(text, type) {
    if (type === 'name') {
      this.setState({
        moneyName: text,
      });
    } else {
      this.setState({
        money: text,
      });
    }
  }
  setMoneyData = async () => {
    if (!this.state.money || !this.state.moneyName) {
      ToastAndroid.show(
        '往里面加数据啊，臭弟弟',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return false;
    }
    let year = this.props.parent.state.showYear;
    let month = this.props.parent.state.showMonth;
    let day = this.props.parent.state.showDay;
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let key = `${year}-${month}-${day}`;
    let time = `${key} ${hour}:${minutes}`;
    let map = new Map();
    try {
      const lodValue = await AsyncStorage.getItem(key);
      map.set(key, JSON.parse(lodValue));
    } catch (e) {
      console.log(e);
      map.set(key, []);
    }
    let listValue = [];
    if (map.get(key)) {
      listValue = map.get(key);
    }
    listValue.push({time, ...this.state});
    try {
      await AsyncStorage.setItem(key, JSON.stringify(listValue));
      await this.canleAdd();
      this.props.parent.setState({
        newData: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  canleAdd = () => {
    this.props.parent.setModalVisible(!this.props.parent.state.modalVisible);
    this.setState({
      money: '',
      moneyName: '',
    });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        hardwareAccelerated={true}
        visible={this.props.parent.state.modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalItem}>
            <Text style={styles.modalText}>干了啥</Text>
            <TextInput
              onChangeText={text => this.onChangeText(text, 'name')}
              style={styles.input}
            />
          </View>
          <View style={styles.modalItem}>
            <Text style={styles.modalText}>多少钱</Text>
            <TextInput
              onChangeText={text => this.onChangeText(text, 'money')}
              style={styles.input}
              keyboardType="number-pad"
            />
          </View>
          <TouchableOpacity style={styles.modalBtn} onPress={this.setMoneyData}>
            <Text style={styles.modalText}>OK了</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBtn} onPress={this.canleAdd}>
            <Text style={styles.modalText}>算了算了</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showYear: new Date().getFullYear(),
      showMonth:
        new Date().getMonth() < 9
          ? '0' + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1,
      showDay: new Date().getDate(),
      clickDay: false,
    };
  }
  week() {
    let week = ['日', '一', '二', '三', '四', '五', '六'].map((item, index) => {
      return (
        <Text key={index} style={styles.weekDay}>
          {item}
        </Text>
      );
    });
    return week;
  }
  day() {
    let year = this.state.showYear;
    let month = Number(this.state.showMonth);
    let day = `${year}/${month}/1`;
    let monthDayFirst = new Date(day).getDay();
    let dayMonth = 31;
    if ([4, 6, 9, 11].includes(month)) {
      dayMonth = 30;
    } else if ([2].includes(month)) {
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        dayMonth = 29;
      } else {
        dayMonth = 28;
      }
    }
    // 增加长度，判断第一天
    let dayListLength = dayMonth + monthDayFirst;
    dayListLength = dayListLength + (7 - (dayListLength % 7));
    // let dataArray = Array.apply(null, Array(dayListLength)).map((item, i) => {
    //   return i;
    // });
    // let dataArray = new Array(dayListLength).join(',').split(',');
    let dataArray = Array.from(new Array(dayListLength).keys());
    // 增加日期的前置空格.<1为上月
    let dayList = dataArray.map((item, index) => {
      return index - monthDayFirst + 1;
    });
    let nowDay = new Date().getDate();
    let nowMonth = Number(new Date().getMonth()) + 1;
    let nowYear = new Date().getFullYear();
    let now = false;
    let dayItem = dayList.map(item => {
      if (
        nowDay === item &&
        nowMonth === Number(this.state.showMonth) &&
        nowYear === this.state.showYear
      ) {
        now = true;
      } else {
        now = false;
      }
      return (
        <Text
          key={item}
          onPress={() => {
            this.handleClick(item);
          }}
          style={[
            styles.daysItem,
            now ? styles.toDay : '',
            this.state.clickDay === item ? styles.clickDay : '',
          ]}>
          {item > 0 && item <= dayMonth ? item : ''}
        </Text>
      );
    });
    let days = this.arrChange(dayItem).map((item, index) => {
      return (
        <View key={index} style={styles.daysRow}>
          {item}
        </View>
      );
    });
    return days;
  }
  monthChange = direction => {
    let month = this.state.showMonth;
    let year = this.state.showYear;
    let changeMonth;
    if (direction === 'last') {
      changeMonth = Number(month) - 1;
      if (changeMonth < 1) {
        year -= 1;
        changeMonth = 12;
      }
    } else {
      changeMonth = Number(month) + 1;
      if (changeMonth > 12) {
        year += 1;
        changeMonth = '01';
      }
    }
    this.setState({
      showMonth: changeMonth,
      showYear: year,
      clickDay: false,
    });
  };
  handleClick = index => {
    this.setState({
      clickDay: index,
    });
    this.props.timeShow.setState({
      showYear: this.state.showYear,
      showMonth: Number(this.state.showMonth),
      showDay: index,
      newData: true,
    });
  };
  arrChange(dayItem) {
    //创建二维数组
    let baseArray = dayItem;
    let len = baseArray.length;
    let n = 7;
    let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
    let res = [];
    for (let i = 0; i < lineNum; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
      let temp = baseArray.slice(i * n, i * n + n);
      res.push(temp);
    }
    return res;
  }
  UNSAFE_componentWillMount() {
    this.gestureHandlers = {
      /**
       * 在手指触摸开始时申请成为响应者
       */
      onStartShouldSetResponder: evt => {
        console.log('onStartShouldSetResponder');
        return true;
      },
      /**
       * 在手指在屏幕移动时申请成为响应者
       */
      onMoveShouldSetResponder: evt => {
        console.log('onMoveShouldSetResponder');
        return true;
      },

      /**
       * 申请成功，组件成为了事件处理响应者，这时组件就开始接收后序的触摸事件输入。
       * 一般情况下，这时开始，组件进入了激活状态，并进行一些事件处理或者手势识别的初始化
       */
      onResponderGrant: (evt, gestureState) => {
        console.log(gestureState);
        console.log('onResponderGrant');
      },

      /**
       * 表示申请失败了，这意味者其他组件正在进行事件处理，
       * 并且它不想放弃事件处理，所以你的申请被拒绝了，后续输入事件不会传递给本组件进行处理。
       */
      onResponderReject: evt => {
        console.log('onResponderReject');
      },

      /**
       * 表示手指按下时，成功申请为事件响应者的回调
       */
      onResponderStart: evt => {
        console.log('onResponderStart');
      },

      /**
       * 表示触摸手指移动的事件，这个回调可能非常频繁，所以这个回调函数的内容需要尽量简单
       */
      onResponderMove: evt => {
        console.log('onResponderMove');
      },

      /**
       * 表示触摸完成（touchUp）的时候的回调，表示用户完成了本次的触摸交互，这里应该完成手势识别的处理，
       * 这以后，组件不再是事件响应者，组件取消激活
       */
      onResponderRelease: evt => {
        console.log('onResponderRelease');
      },

      /**
       * 组件结束事件响应的回调
       */
      onResponderEnd: evt => {
        console.log(evt);
        console.log('onResponderEnd');
      },

      /**
       * 当其他组件申请成为响应者时，询问你是否可以释放响应者角色让给其他组件
       */
      onResponderTerminationRequest: evt => {
        console.log('onResponderTerminationRequest');
        return true;
      },

      /**
       * 如果 onResponderTerminationRequest 回调函数返回为 true，
       * 则表示同意释放响应者角色，同时会回调如下函数，通知组件事件响应处理被终止
       * 这可能是由于其他View通过onResponderTerminationRequest请求的，也可能是由操作系统强制夺权（比如iOS上的控制中心或是通知中心）。
       */
      onResponderTerminate: evt => {
        console.log('onResponderTerminate');
      },
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // console.log('evt', evt);
        // console.log('gestureState', gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          this.monthChange('last');
        } else if (gestureState.dx < -50) {
          this.monthChange('next');
        }
      },
    });
  }
  render() {
    return (
      <View style={styles.time}>
        <View style={styles.timeTitle}>
          <Icon
            name={'left'}
            size={26}
            onPress={() => {
              this.monthChange('last');
            }}
          />
          <View>
            <Text>
              {this.state.showYear}年{this.state.showMonth}月
            </Text>
          </View>
          <Icon
            name={'right'}
            size={26}
            onPress={() => {
              this.monthChange('next');
            }}
          />
        </View>
        <View style={styles.timeContent}>
          <View style={styles.weeks}>{this.week()}</View>
          <View
            {...this.gestureHandlers}
            {...this.panResponder.panHandlers}
            style={styles.days}>
            {this.day()}
          </View>
        </View>
      </View>
    );
  }
}
/**
 * FlatList相关方法
    ref = 'flatList'  // this.refs.flatList 获取到该组件
    data = {[{name: '小米'},{name: '小兵'}]}   // 列表的数据源, 数组
    extraData = {this.state} //引用类型，数据可能不会更新，只是复制，没有操作引用的对象
    ListHeaderComponent = {this._listHeaderComponent.bind(this)}//渲染头部组件
    ListEmptyComponent = {this._listEmptyComponent.bind(this)} //列表为空时渲染
    initialNumToRender = {6} //首屏渲染的数据量，不会在滑动中被卸载
    renderItem = {this._renderItem.bind(this)} //渲染列表数据
    keyExtractor= {(item, index) => index + item;} //每行不一样的key
    ItemSeparaterComponent = {() => <View style={{height:6}} /> //行分隔线，首行前和尾行后无分隔
    columnWrapperStyle = {{borderWidth: 2}}  //行数>1时，可额外设置行样式
    showsVerticalScrollIndicator = {false} //继承ScrollView的属性，显示水平指示器默认是true
    horizontal = {false} //默认true是垂直布局
    numColumns = {3}  // 水平布局的item数量
    ListFooterComponent = {this._listFooterComponent.bind(this)} //渲染底部组件
    refreshing = {true} // 等待加载出现加载的符号
    onRefresh = {this._onRefresh.bind(this)} //上拉刷新
    onEndReachedThreshold = {0.1} //当距离内容比例不足内容0.1比例时触发onEndReached
    onEndReached = {this._endReached.bind(this)} //上拉加载数据
**/
