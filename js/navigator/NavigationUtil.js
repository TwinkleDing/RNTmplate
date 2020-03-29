/**
 * 全局导航控制类
 */
export default class NavigationUtil {
  /**
   * 跳转到指定页面
   * @param params
   * @param page
   */
  static goPage(params, page) {
    const navigation = params.navigation;
    console.log(navigation)
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null');
      return;
    }
    navigation.navigate(page, {
      ...params,
    });
  }
  /**
   * 返回上一页
   * @param navigation
   */
  static goBack(params) {
    const {navigation} = params;
    navigation.goBack(null);
  }

  /**
   * 重定向到首页
   * @param navigation
   */
  // eslint-disable-next-line no-dupe-class-members
  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }
}
