import PMemberRoleManage from 'publish/page/PMemberRoleManage';
import PDocContentCheckArround from 'publish/page/PDocContentCheckArround';
import PDocContentCheckItem from './page/PDocContentCheckItem';
import PDocContentCheckCo from './page/PDocContentCheckCo';
import PDocContentSign from './page/PDocContentSign';
import PDocContentEducationInfo from './page/PDocContentEducationInfo';
import PDocContentEducationAttendUser from './page/PDocContentEducationAttendUser';
import PDocContentInventoryList from './page/PDocContentInventoryList';
import PDocContentWPlanInfo from './page/PDocContentWPlanInfo';
import PDocContentWPlanCheck from './page/PDocContentWPlanCheck';
import PDocContentWPlanFling from './page/PDocContentWPlanFling';
import PDocContentFileAttach from './page/PDocContentFileAttach';
import PDocContentWorkInspection from './page/PDocContentWorkInspection';
import PDocContentWorkCondition from './page/PDocContentWorkCondition';
import PDocContentMtInfo from './page/PDocContentMtInfo';
import PCheckItemList1 from './page/PCheckItemList1';
import PCheckItemList2 from './page/PCheckItemList2';
import PConfinedSpaceForm1 from './page/PConfinedSpaceForm1';
import PConfinedSpaceForm2 from './page/PConfinedSpaceForm2';
import PConfinedSpaceForm3 from './page/PConfinedSpaceForm3';
import PCheckResultList from './page/PCheckResultList';
import PCheckResultForm from './page/PCheckResultForm';
import PWorkOrderResgistStats from './page/PWorkOrderResgistStats';
import PWorkOrderDashBoard from './page/PWorkOrderDashBoard';

const PageConfig2 = {};

const list = [
  {
    component: PMemberRoleManage,
    url: '/common/PMemberRoleManage'
  },
  {
    component: PDocContentCheckArround,
    url: '/safe-docs/content/PDocContentCheckArround'
  },
  {
    component: PDocContentCheckItem,
    url: '/safe-docs/content/PDocContentCheckItem'
  },
  {
    component: PDocContentCheckCo,
    url: '/safe-docs/content/PDocContentCheckCo'
  },
  {
    component: PDocContentSign,
    url: '/safe-docs/content/PDocContentSign'
  },
  {
    component: PDocContentEducationInfo,
    url: '/safe-docs/content/PDocContentEducationInfo'
  },
  {
    component: PDocContentEducationAttendUser,
    url: '/safe-docs/content/PDocContentEducationAttendUser'
  },
  {
    component: PDocContentInventoryList,
    url: '/safe-docs/content/PDocContentInventoryList'
  },
  {
    component: PDocContentWPlanInfo,
    url: '/safe-docs/content/PDocContentWPlanInfo'
  },
  {
    component: PDocContentWPlanCheck,
    url: '/safe-docs/content/PDocContentWPlanCheck'
  },
  {
    component: PDocContentWPlanFling,
    url: '/safe-docs/content/PDocContentWPlanFling'
  },
  {
    component: PDocContentFileAttach,
    url: '/safe-docs/content/PDocContentFileAttach'
  },
  {
    component: PDocContentWorkInspection,
    url: '/safe-docs/content/PDocContentWorkInspection'
  },
  {
    component: PDocContentWorkCondition,
    url: '/safe-docs/content/PDocContentWorkCondition'
  },
  {
    component: PDocContentMtInfo,
    url: '/safe-docs/content/PDocContentMtInfo'
  },
  {
    component: PCheckItemList1,
    url: '/check/PCheckItemList1'
  },
  {
    component: PCheckItemList2,
    url: '/check/PCheckItemList2'
  },
  {
    component: PConfinedSpaceForm1,
    url: '/check/PConfinedSpaceForm1'
  },
  {
    component: PConfinedSpaceForm2,
    url: '/check/PConfinedSpaceForm2'
  },
  {
    component: PConfinedSpaceForm3,
    url: '/check/PConfinedSpaceForm3'
  },
  {
    component: PCheckResultList,
    url: '/check/PCheckResultList'
  },
  {
    component: PCheckResultForm,
    url: '/check/PCheckResultForm'
  },
  {
    component: PWorkOrderResgistStats,
    url: '/etc/PWorkOrderResgistStats'
  },
  {
    component: PWorkOrderDashBoard,
    url: '/etc/PWorkOrderDashBoard'
  }
];

PageConfig2.list = list;

export default PageConfig2;
