import Login from './components/Account/Login.vue'
import refresh from './components/refresh.vue'
import Home from './components/Home.vue'
import Print from './components/Common/print.vue'
import text from './components/Common/text.vue'
// import Home from './layout/Layout.vue'
import menuList from './components/Administrative/system/menu/list.vue'
import menuAdd from './components/Administrative/system/menu/add.vue'
import menuEdit from './components/Administrative/system/menu/edit.vue'
import systemConfig from './components/Administrative/system/config/add.vue'
import ruleList from './components/Administrative/system/rule/list.vue'
import ruleAdd from './components/Administrative/system/rule/add.vue'
import ruleEdit from './components/Administrative/system/rule/edit.vue'
import positionList from './components/Administrative/structures/position/list.vue'
import positionAdd from './components/Administrative/structures/position/add.vue'
import positionEdit from './components/Administrative/structures/position/edit.vue'
import structuresList from './components/Administrative/structures/structures/list.vue'
import structuresAdd from './components/Administrative/structures/structures/add.vue'
import structuresEdit from './components/Administrative/structures/structures/edit.vue'
import groupsList from './components/Administrative/structures/groups/list.vue'
import groupsAdd from './components/Administrative/structures/groups/add.vue'
import groupsEdit from './components/Administrative/structures/groups/edit.vue'
import usersList from './components/Administrative/personnel/users/list.vue'
import usersAdd from './components/Administrative/personnel/users/add.vue'
import usersEdit from './components/Administrative/personnel/users/edit.vue'
import yhList from './components/Administrative/personnel/yh/list.vue'
import weChatRetailList from './components/WeChat/retail/list.vue'
import weChatRentalList from './components/WeChat/rental/list.vue'
import weChatRentaShipments from './components/WeChat/rental/shipments.vue'
import weChatInventoriesAdd from './components/WeChat/config/inventories/add.vue'
import weChatInventoriesList from './components/WeChat/config/inventories/list.vue'
import weChatAutoReplyList from './components/WeChat/config/autoreply/list.vue'
import weChatAutoReplyAdd from './components/WeChat/config/autoreply/add.vue'
import weChatFansList from './components/WeChat/fans/list.vue'
import weChatSettingList from './components/WeChat/config/wechatSetting/list.vue'
import weChatSettingAdd from './components/WeChat/config/wechatSetting/add.vue'
import cateList from './components/Goods/category/list.vue'
import cateEdit from './components/Goods/category/edit.vue'
import cateAdd from './components/Goods/category/add.vue'
import brandList from './components/Goods/brand/list.vue'
import brandAdd from './components/Goods/brand/add.vue'
import brandEdit from './components/Goods/brand/edit.vue'
import typeList from './components/Goods/type/list.vue'
import typeEdit from './components/Goods/type/edit.vue'
import attrList from './components/Goods/type/attribute.vue'
import attrEdit from './components/Goods/type/editAttr.vue'
import attrAdd from './components/Goods/type/attrAdd.vue'
import specList from './components/Goods/type/spec.vue'
import specEdit from './components/Goods/type/editSpec.vue'
import specAdd from './components/Goods/type/specAdd.vue'
import typeAdd from './components/Goods/type/add.vue'
import goodsList from './components/Goods/goods/list.vue'
import goodsEdit from './components/Goods/goods/edit.vue'
import goodsAdd from './components/Goods/goods/add.vue'

/**
 * meta参数解析
 * hideLeft: 是否隐藏左侧菜单，单页菜单为true
 * module: 菜单所属模块
 * menu: 所属菜单，用于判断三级菜单是否显示高亮，如菜单列表、添加菜单、编辑菜单都是'menu'，用户列表、添加用户、编辑用户都是'user'，如此类推
 */

const routes = [
  { path: '/', component: Login, name: 'Login' },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/refresh', component: refresh, name: 'refresh' }
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'menu/list', component: menuList, name: 'menuList', meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }},
      { path: 'menu/add', component: menuAdd, name: 'menuAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }},
      { path: 'menu/edit/:id', component: menuEdit, name: 'menuEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'menu' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'config/add', component: systemConfig, name: 'systemConfig', meta: { hideLeft: false, module: 'Administrative', menu: 'systemConfig' }}
    ]
  },

  {
    path: '/home',
    component: Home,
    children: [
      { path: 'rule/list', component: ruleList, name: 'ruleList', meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }},
      { path: 'rule/add', component: ruleAdd, name: 'ruleAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }},
      { path: 'rule/edit/:id', component: ruleEdit, name: 'ruleEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'rule' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'position/list', component: positionList, name: 'positionList', meta: { hideLeft: false, module: 'Administrative', menu: 'position' }},
      { path: 'position/add', component: positionAdd, name: 'positionAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'position' }},
      { path: 'position/edit/:id', component: positionEdit, name: 'positionEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'position' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'structures/list', component: structuresList, name: 'structuresList', meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }},
      { path: 'structures/add', component: structuresAdd, name: 'structuresAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }},
      { path: 'structures/edit/:id', component: structuresEdit, name: 'structuresEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'structures' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'groups/list', component: groupsList, name: 'groupsList', meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }},
      { path: 'groups/add', component: groupsAdd, name: 'groupsAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }},
      { path: 'groups/edit/:id', component: groupsEdit, name: 'groupsEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'groups' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'users/list', component: usersList, name: 'usersList', meta: { hideLeft: false, module: 'Administrative', menu: 'users' }},
      { path: 'users/add', component: usersAdd, name: 'usersAdd', meta: { hideLeft: false, module: 'Administrative', menu: 'users' }},
      { path: 'users/edit/:id', component: usersEdit, name: 'usersEdit', meta: { hideLeft: false, module: 'Administrative', menu: 'users' }}
    ]
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'yh/list', component: yhList, name: 'yhList', meta: { hideLeft: false, module: 'Administrative', menu: 'users' }}
    ]
  },
  {
    path: '/goods',
    component: Home,
    children: [
      { path: 'category/list', component: cateList, name: 'cateList', meta: { hideLeft: false, module: 'Goods', menu: 'category' }},
      { path: 'category/edit/:id', component: cateEdit, name: 'cateEdit', meta: { hideLeft: false, module: 'Goods', menu: 'category' }},
      { path: 'category/add', component: cateAdd, name: 'cateAdd', meta: { hideLeft: false, module: 'Goods', menu: 'category' }},
      { path: 'brand/list', component: brandList, name: 'brandList', meta: { hideLeft: false, module: 'Goods', menu: 'brand' }},
      { path: 'brand/edit/:id', component: brandEdit, name: 'brandEdit', meta: { hideLeft: false, module: 'Goods', menu: 'brand' }},
      { path: 'brand/add', component: brandAdd, name: 'brandAdd', meta: { hideLeft: false, module: 'Goods', menu: 'brand' }},
      { path: 'type/list', component: typeList, name: 'typeList', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/edit/:id', component: typeEdit, name: 'typeEdit', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/add', component: typeAdd, name: 'typeAdd', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/attribute/:type', component: attrList, name: 'attrList', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/attribute/edit/:id', component: attrEdit, name: 'attrEdit', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/infoAttr', component: attrAdd, name: 'attrAdd', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/spec/:type', component: specList, name: 'specList', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/spec/edit/:id', component: specEdit, name: 'specEdit', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'type/infoSpec', component: specAdd, name: 'specAdd', meta: { hideLeft: false, module: 'Goods', menu: 'type' }},
      { path: 'goods/list', component: goodsList, name: 'goodsList', meta: { hideLeft: false, module: 'Goods', menu: 'goods' }},
      { path: 'goods/add', component: goodsAdd, name: 'goodsAdd', meta: { hideLeft: false, module: 'Goods', menu: 'goods' }},
      { path: 'goods/edit/:id', component: goodsEdit, name: 'goodsEdit', meta: { hideLeft: false, module: 'Goods', menu: 'goods' }}
    ]
  },
  {
    path: '/wechat',
    component: Home,
    children: [
      { path: 'retail/list', component: weChatRetailList, name: 'weChatRetailList', meta: { hideLeft: false, module: 'WeChat', menu: 'retail' }}
    ]
  },
  {
    path: '/wechat',
    component: Home,
    children: [
      { path: 'rental/list', component: weChatRentalList, name: 'weChatRentalList', meta: { hideLeft: false, module: 'WeChat', menu: 'rental' }},
      { path: 'rental/shipments/:param', component: weChatRentaShipments, name: 'weChatRentaShipments', meta: { hideLeft: false, module: 'WeChat', menu: 'rental' }}
    ]
  },
  {
    path: '/wechat',
    component: Home,
    children: [
      { path: 'print/:param', component: Print, name: 'Print', meta: { hideLeft: false, module: 'WeChat', menu: 'print' }},
      { path: 'text', component: text, name: 'text', meta: { hideLeft: false, module: 'WeChat', menu: 'text' }}
    ]
  },
  {
    path: '/wechat',
    component: Home,
    children: [
      { path: 'inventories/list', component: weChatInventoriesList, name: 'weChatInventoriesList', meta: { hideLeft: false, module: 'WeChat', menu: 'inventories' }},
      { path: 'inventories/add', component: weChatInventoriesAdd, name: 'weChatInventoriesAdd', meta: { hideLeft: false, module: 'WeChat', menu: 'inventories' }}
    ]
  },
  {
    path: '/wechat',
    component: Home,
    children: [
      { path: 'autoreply/list', component: weChatAutoReplyList, name: 'weChatAutoReplyList', meta: { hideLeft: false, module: 'WeChat', menu: 'autoreply' }},
      { path: 'autoreply/add', component: weChatAutoReplyAdd, name: 'weChatAutoReplyAdd', meta: { hideLeft: false, module: 'WeChat', menu: 'autoreply' }}
    ]
  },
  {
    path: '/wechat',
    component: Home,
    children: [
      { path: 'setting/list', component: weChatSettingList, name: 'weChatSettingList', meta: { hideLeft: false, module: 'WeChat', menu: 'setting' }},
      { path: 'setting/add', component: weChatSettingAdd, name: 'weChatSettingAdd', meta: { hideLeft: false, module: 'WeChat', menu: 'setting' }}
    ]
  },
  {
    path: '/wechat',
    component: Home,
    children: [
      { path: 'fans/list', component: weChatFansList, name: 'weChatFansList', meta: { hideLeft: false, module: 'WeChat', menu: 'fans' }}
    ]
  }
]
export default routes
