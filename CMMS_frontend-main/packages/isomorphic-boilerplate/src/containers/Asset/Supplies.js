import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
// import notification from '@iso/components/Notification';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Button from '@iso/components/uielements/button';
// import { Tree } from "antd";
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import clone from 'clone';
import assetActions from '../../redux/asset/actions';
import CardWrapper, { Box, StatusTag } from './Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import Modals from '@iso/components/Feedback/Modal';
import AssetCategoryModal from '../../component/AssetCategoryModal';
import ModalStyle, { ModalContent } from './Styles/Modal.styles';
import WithDirection from '@iso/lib/helpers/rtl';
import treeViewImg from '../../assets/images/hierarchy-view.png';
import flatViewImg from '../../assets/images/flat-view-on.png';
import facilityImg from '../../assets/images/facilities-48.png';
// import equipmentImg from '../../assets/images/equipment-48.png';
// import toolImg from '../../assets/images/tools-48.png';
import partImg from '../../assets/images/parts-48.png'
import onlineImg from '../../assets/images/running-small.png';
import offlineImg from '../../assets/images/paused-small.png';
import sortFunction from './data';
const dataList = new sortFunction();
// import 'antd/dist/antd.css';
// import { Table, Switch, Space } from 'antd';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const { getSupplies, getAssetByFilter } = assetActions;
export default function Assets() {
  let history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { assets, rawAssets, isDelete } = useSelector((state) => state.Assets);
  const [modalVisible, setModalVisible] = React.useState(false);
  // const [category,setCategory]=React.useState('');
  const [viewOption, setViewOption] = React.useState(1);
  const [assetsTree, setAssetsTree] = React.useState([]);
  const [assetCategoryActive, setAssetCategoryActive] = React.useState(false);
  const [filterName, setFilterName] = React.useState(
    'filter by Category : Assets'
  );
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 25,
  });
  const columns1 = [
    {
      title: 'Code',
      dataIndex: '_id',
      key: '_id',
      width: '10%',
      render: (text, row) => {
        return (
          <span>          
            <a onClick={() => goDetail(row._id)}>{"PS#"+text}</a>
          </span>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'strName',
      key: 'strName',
      width: '20%',
      render: (text, row) => {       
        return <a onClick={() => goDetail(row._id)}><img style={{ width: "16px", height: "17px", marginRight: "5px" }} src={partImg}></img>{text}</a>;
      },
    },
    {
      title: 'Code',
      dataIndex: 'strCode',
      key: 'strCode',
      width: '10%',
      render: (text, row) => {      
        return <a onClick={() => goDetail(row._id)}>{text}</a>;
      },
    },
    {
      title: 'Asset Status',
      dataIndex: 'bolIsOnline',
      key: 'bolIsOnline',
      width: '10%',
      render: (text, row) => {
        let statueImg;
        if (text === true) {
          statueImg = onlineImg;
        } else {
          statueImg = offlineImg;
        }
        return (
          <img style={{ width: '16px', height: '10px' }} src={statueImg}></img>
        );
      },
    },

    {
      title: 'Vendors',
      dataIndex: 'Vendors',
      key: 'Vendors',
      width: '10%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Department',
      dataIndex: 'strDescriptiond',
      key: 'strDescriptiond',
      width: '15%',
      render: (text) => <span>{text}</span>,
    },
  ];

  const sortColumns = [
    { ...columns1[0], sorter: true },
    { ...columns1[1], sorter: true },
    { ...columns1[2], sorter: true },
    { ...columns1[3], sorter: true },
    { ...columns1[4], sorter: true },
  ];

  // React.useEffect(() => {
  //   dispatch(initData());
  // }, []);
  React.useEffect(() => {
    if (viewOption === 1) {
      var tree = makeTree(assets);
      setAssetsTree(tree);
    }
  }, [assets]);

  React.useEffect(() => {
    dispatch(getSupplies());
  }, [viewOption]);
  React.useEffect(() => {
    if (isDelete) {
      dispatch(getSupplies());
    }
  }, [isDelete]);

  const handleCancel = () => {
    setModalVisible(false);
    setAssetCategoryActive(false);
  };
  const goDetail = (id) => {
    history.push(`/dashboard/supplier/edit/${id}`);
  };
  const makeTree = (arr) => {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;
    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.key] = arrElem;
      mappedArr[arrElem.key]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentid) {
          //if(mappedArr[mappedElem['parentid']]['children']==undefined)
          if (mappedArr[mappedElem['parentid']] != undefined)
            mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
          else tree.push(mappedElem);
          //delete mappedElem.children; //remove blank children
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  };  

  const onChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey, rawAssets);
      } else {
        dataList.getSortDesc(sorter.columnKey, rawAssets);
      }
      setAssetsTree(rawAssets);
    }
    setPagination(pagination);
  };
  const selectedCategory = (selectNode) => {
    setFilterName('filter by Category : ' + selectNode.strName);
    var parentIds = [];
    parentIds.push(selectNode._id);
    for (var i = 0; i < selectNode.children.length; i++) {
      parentIds.push(selectNode.children[i]._id);
      for (var k = 0; k < selectNode.children[i].children.length; k++) {
        parentIds.push(selectNode.children[i].children[k]._id);
        for (
          var z = 0;
          z < selectNode.children[i].children[k].children.length;
          z++
        ) {
          parentIds.push(selectNode.children[i].children[k].children[z]._id);
        }
      }
    }

    // if (selectNode.intSysCode == 0) {
    //   dispatch(initData());
    //   setViewOption(1);
    // } else {
    //   // setViewOption(2);
    //   dispatch(getAssetByFilter(parentIds.join(',')));
    // }

    //setFilterIds(parentIds);
    setAssetCategoryActive(false);
  };
  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.partSupply" />
      </PageHeader>
      <Box>     
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              New
            </Button>
          </Link>          
        </div>

        <CardWrapper title="Assets">
          <div className="isoInvoiceTable">           
              <TableWrapper
                // rowSelection={rowSelection}
                dataSource={rawAssets}
                columns={clone(sortColumns)}
                // pagination={true}
                onChange={onChange}
                pagination={pagination}
              />           
          </div>
        </CardWrapper>
      </Box>
      <AssetCategoryModal
        visible={assetCategoryActive}
        selectedCategory={selectedCategory}
        parentKind={'Assets'}
        onCancel={handleCancel}
        title={'ASSET CATEGORIES'}
      ></AssetCategoryModal>
    </LayoutWrapper>
  );
}
