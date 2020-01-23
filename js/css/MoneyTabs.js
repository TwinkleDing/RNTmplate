import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    position: 'relative',
    padding: 10,
  },
  title: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
  },
  content: {
    height: 'auto',
    flex: 1,
  },
  menu: {
    color: '#eee',
    backgroundColor: 'rgba(40, 126, 224, 0.924)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(40, 126, 224, 0.524)',
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
    width: 100,
  },
  time: {
    backgroundColor: '#F5FCFF',
    minHeight: 350,
    maxHeight: 400,
  },
  timeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // backgroundColor: '#2894FF',
  },
  timeContent: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  weeks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  weekDay: {
    fontSize: 18,
    textAlign: 'center',
    width: 40,
  },
  days: {},
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  daysItem: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  toDay: {
    backgroundColor: '#46A3FF',
  },
  clickDay: {
    backgroundColor: '#00ffff',
  },
  dayChoose: {
    backgroundColor: '#97CBFF',
  },
  list: {
    flex: 1,
  },
  moneyList: {
    padding: 20,
  },
  moneyListTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  moneyListItem: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  moneyListText: {
    fontSize: 20,
    marginRight: 30,
  },
  newAdd: {
    color: '#2a8df3',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#2a8df3',
    borderWidth: 1,
    width: 250,
    marginLeft: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  modalBtn: {
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    alignItems: 'center',
  },
});
