import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/login/loginPage'
import registerPage from '@/components/register/registerPage'
import mainPage from '@/components/main/mainPage'
import indexPage from '@/components/main/index'
import recipesPage from '@/components/menu/recipes'
import menuPage from '@/components/menu/menu'
import dishesPage from '@/components/menu/dishes'
import activityPage from "@/components/activity/activity"
import addActivityPage from "@/components/activity/addActivity"
import activityDetailPage from '@/components/activity/detailActivity'
import foodRegisterPage from '@/components/food/foodRegister'
import reimbursementPage from '@/components/food/reimbursement'
import riceYearPage from '@/components/food/riceYear'
import supplyPage from '@/components/food/supply'
import groupPage from '@/components/group/groupManagement'
import powerPage from '@/components/group/powerMangement'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'firstPage',
      component: loginPage
    },
    {
      path: '/login',
      name: 'loginPage',
      component: loginPage
    },
    {
      path:"/register",
      name:"registerPage",
      component:registerPage
    },
    {
      path:"/main",
      name:"mainPage",
      component:mainPage,
      children:[
        {
          path:"",
          name:"mainDefault",
          component:indexPage
        },
        {
          path:"/index",
          name:"mainIndex",
          component:indexPage
        },
        {
          path:"/recipes",
          name:"recipesPage",
          component:recipesPage
        },

        {
          path:"/detailMenu",
          name:"menuPage",
          component:menuPage
        },
        {
          path:"/dishes",
          name:"dishesPage",
          component:dishesPage
        },
        {
          path:"/activity",
          name:"activityPage",
          component:activityPage
        },
        {
          path:"/addActivity",
          name:"addActivityPage",
          component:addActivityPage
        },
        {
          path:"/detailActivity",
          name:"activityDetailPage",
          component:activityDetailPage
        },
        {
          path:"/foodRegister",
          name:"foodRegisterPage",
          component:foodRegisterPage
        },
        {
          path:"/reimbursement",
          name:"reimbursementPage",
          component:reimbursementPage
        },
        {
          path:"/riceYear",
          name:"riceYearPage",
          component:riceYearPage
        },
        {
          path:"/supply",
          name:"supplyPage",
          component:supplyPage
        },
        {
          path:"/group",
          name:"groupPage",
          component:groupPage
        },
        {
          path:"/power",
          name:"powerPage",
          component:powerPage
        }
      ]
    }
  ]
})
