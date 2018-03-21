<template>
<!-- <div>
<el-menu mode="vertical" default-active="/table" class="el-menu-vertical-demo" @select="handleselect" theme="dark" router>
<el-menu-item-group v-for="menu in menuData" :title="menu.title">
<el-menu-item v-for="item in menu.items" :index="item.path">&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}</el-menu-item>
</el-menu-item-group>
</el-menu>
</div> -->

	<div>  
		<div v-for="secMenu in menuData">
			<div class="c-light-gray p-l-10 m-t-15">{{secMenu.title}}</div>
			<div class="h-50" v-for="item in secMenu.child">
				<template v-if="item.menu == menu">
					<div class="w-100p h-50 p-l-40 left-menu pointer c-blue" @click="routerChange(item)">{{item.title}}</div>
				</template>
				<template v-else>
					<div class="w-100p h-50 p-l-40 left-menu pointer c-gra" @click="routerChange(item)">
						{{item.title}}
					</div>
				</template>
			</div>
		</div>
	</div>
</template> 




<!--
 <template id="tab">
        <div id="tabPanel">
            <div class="item">
            <div v-for="secMenu in menuData">
                <div class="menutitle" @click="toggle()"><i class="icon-th-list"></i>&nbsp;{{secMenu.title}}</div>
                    <div class="sildermun" v-show="status">
                        <ul>
                        	<div class="h-50" v-for="item in secMenu.child">
                        	<template v-if="item.menu == menu">
                            <li v-for="(index,v) in childItems"><i class="icon-star"></i>&nbsp;{{item.title}}</li>
                            </template>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </template>

-->


<script>
export default {
  props: ['menuData', 'menu'],
  data() {
    return {
    }
  },
  methods: {
    routerChange(item) 	{
      // 与当前页面路由相等则刷新页面
      if (item.url != this.$route.path) {
        router.push(item.url)
      } else {

        _g.shallowRefresh(this.$route.name)
      }
    }
  }
}
</script>