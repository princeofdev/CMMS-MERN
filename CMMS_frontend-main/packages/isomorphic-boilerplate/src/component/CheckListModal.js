import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import formBuilderAction from "../redux/formbuilder/actions";

import { Col, Row } from "antd";
import './table.css'
// import treeViewImg from '../assets/images/hierarchy-view.png';
// import flatViewImg from '../assets/images/flat-view-on.png';
import facilityImg from '../assets/images/facilities-48.png'



const { getDatas } = formBuilderAction;

export default function (props) {
  
  const { visible, title } = props;
  const dispatch = useDispatch();
  const { formDatas, isDelete } = useSelector((state) => state.formBuilder);
  const [assetsTree, setAssetsTree] = React.useState([]);
  const [checkLists,setCheckLists]=React.useState([]);
  const [strSearchVal, setStrSearchVal] = React.useState("");
  const columns = [
    {
      title: "Code",
      dataIndex: "_id",
      rowKey: "_id",
      width: "10%",
      render: (text, row) => {
        return <a onClick={() => goSelect(row)}> {"CL# " + text}</a>
      },
    },
    {
      title: 'Title',
      dataIndex: '_id',
      key: '_id',
      width: '30%',
      render: (text, row) => {
        var content = row.formData ? row.formData[0].content : null;
        var temp = null;
        if (content) {
          temp = content.replace('<p style="text-align:center;">', "");
          temp = temp.replace('<strong>', "");
          temp = temp.replace('</strong>', "");
        }

        return <a onClick={() => goSelect(row)}>{temp ? temp : "CheckList# " + text}</a>;
      }
    }
  ];
  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginTop: "-20px",
    background: "#e0e7ed",
    height: "38px",
    marginLeft: "2px",
    borderBottom: "1px solid rgb(174,193,208)"
  };
  // const [newModalActive, setNewModalActive] = React.useState(false);

  // React.useEffect(() => {
  //   if (visible == true)
  //     dispatch(initData());
  // }, [visible]);
  React.useEffect(() => {
    if(visible){
      dispatch(getDatas())
    }
  }, [visible]);

  React.useEffect(() => {
    console.log(formDatas);
    setCheckLists(formDatas)
  }, [formDatas]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      props.selectedAsset(record);
      props.onCancel();
    },
  };
  const goSearch = (event) => {
    var temp_asset = [];
    // for (var i = 0; i < rawAssets.length; i++) {
    //   // console.log(rawAssets[i]);
    //   if (rawAssets[i].strName.includes(event.target.value)) {
    //     temp_asset.push(rawAssets[i]);
    //   }
    // }
  
  }
  const goSelect=(item)=>{
    props.selectItem(item);
  }
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        // okText="New"
        title={title}
        // width={window.innerWidth - 300}
        // onOk={() =>{setNewModalActive(true)}}
        onCancel={props.onCancel}
        footer={null}
      >
        <div>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={14} sm={14} xs={24} >
            </Col>
            <Col md={10} sm={10} xs={24}>
              <InputSearch
                value={strSearchVal}
                onChange={(event) => goSearch(event)}
                placeholder="input search text"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: "3px", height: "430px" }}>

          <Scrollbars style={{ width: "100%", height: "430px" }}>    
            <TableWrapper
              // rowSelection={rowSelection}
              dataSource={checkLists}
              columns={columns}
              // rowSelection={{ ...rowSelection, type: "radio" }}
              pagination={{ pageSize: 10}}
              className="invoiceListTable"
            />
          </Scrollbars>

        </div>
      </Modal>
    </div>
  )
}