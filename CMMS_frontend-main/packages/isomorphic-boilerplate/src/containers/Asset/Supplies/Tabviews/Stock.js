import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from "@iso/components/utility/customScrollBar";
import Modal from '@iso/components/Feedback/Modal';
import Button from '@iso/components/uielements/button';
import moment from 'moment';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../../assets/images/new-inner-list.png';
import '../../../../component/table.css'
import StockModal from "../../../../component/StockModal";

import StockAction from "../../../../redux/stock/actions";
// import {
//   ActionBtn,
//   Fieldset,
//   Form,
//   Label,
// } from '../OnlineContent.styles';

export default function (props) {
  const { assetId, assetName } = props;
  const dispatch = useDispatch();
  const { getStockData, deleteData } = StockAction;
  const { stocks, isDelete} = useSelector((state) => state.Stock);
  const [assetEventModalActive, setAssetEventModalActive] = React.useState(false);
  const [stockModalActive, setStockModalActive] = React.useState(false);
  const [stockPageState, setStockPageState] = React.useState("Add");
  const [stockData,setStockData]=React.useState(null);

  const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  };
  const onCancel = () => {
    setStockModalActive(false);
  }
  React.useEffect(() => {
    console.log('dispatch')
    dispatch(getStockData(assetId));
  }, []);
  React.useEffect(() => {
    if(isDelete)
      dispatch(getStockData(assetId));
  }, [isDelete]);
  const onRowClick=(row)=>{
    setStockPageState("edit");
    setStockModalActive(true);
    setStockData(row);
  }
  
  return (
    <div className="isoInvoiceTable">
      <Row style={rowStyle} gutter={16} style={{ background: "#e8edf0", padding: "5px 0 3px 0px", marginBottom: '5px' }}>
        <Col md={24} sm={24} xs={24} >
          <div style={{ color: "#738796", marginLeft: "10px" }}>Stock Levels Per Location</div>
        </Col>
      </Row>
      <Scrollbars
        style={{ width: "100%", height: "calc(35vh - 70px)" }}
      >
        {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        /> */}
        <table style={{ overflow: 'auto' }}>
          <thead>
            <tr>
              <th style={{ width: "30%" }} ><span className="listHeaderLabel35">Location</span></th>
              <th style={{ width: "20%" }}><span className="listHeaderLabel35">Facility</span></th>
              <th style={{ width: "10%" }}><span className="listHeaderLabel35">Qty On Hand</span></th>
              <th style={{ width: "10%" }}><span className="listHeaderLabel35">Min Qty</span></th>
              <th style={{ width: "10%" }}></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

       {
            stocks.length!=0?
            stocks.map((row)=>{
                return <tr className="listRow" key={row.key} >                    
                  <td className="column" onClick={() => { onRowClick(row) }}><p className="context">{row.intLocationId ? row.intLocationId.strName:""}</p></td>
                  <td className="column" onClick={() => { onRowClick(row) }}><p className="context">{row.intFacilityID ? row.intFacilityID.strName : ""}</p></td>
                  <td className="column" onClick={() => { onRowClick(row) }}><p className="context">{row.qtyOnHand}</p></td>
                  <td className="column" onClick={() => { onRowClick(row) }}><p className="context">{row.qtyMinQty}</p></td>
                  <td className="column">
                    <Button
                      className="DltBtn"
                      // icon="delete"
                      onClick={() => {
                        // deleteRow(row._id,);
                        dispatch(deleteData(row._id))

                      }}
                    >
                      <i className="ion-android-delete" />
                    </Button>

                  </td>
                  <td className="column"></td>
                    </tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="3">No Data!</td></tr>
          
          } 
          </tbody>

        </table>
      </Scrollbars>
      <div style={{
        color: "rgb(102, 115, 136)",
        fontSize: "10pt",
        background: "#f7f7f7",
        border: "1px solid rgb(241, 243, 246)",
        height: "25px"
      }}>
        <span style={{
          float: "left",
          marginLeft: "4px",
          marginRight: "4px",
          cursor: "pointer",
        }}>
          <img src={newAddImg} onClick={() => { setStockModalActive(true); setStockPageState("Add") }}></img>
        </span>
      </div>

      <Row style={rowStyle} gutter={16} style={{ background: "#e8edf0", padding: "5px 0 3px 0px", marginBottom: '5px', marginTop: "10px" }}>
        <Col md={24} sm={24} xs={24} >
          <div style={{ color: "#738796", marginLeft: "10px" }}>Receipts</div>
        </Col>
      </Row>
      <Scrollbars
        style={{ width: "100%", height: "calc(35vh - 70px)" }}
      >
        {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        /> */}
        <table style={{ overflow: 'auto', width: "70%" }}>
          <thead>
            <tr>
              <th style={{ width: "30%" }} ><span className="listHeaderLabel35">Event</span></th>
              <th ><span className="listHeaderLabel35">Date Submitted</span></th>

            </tr>
          </thead>
          <tbody>

            {/* {
            assetEvents.length!=0?
            assetEvents.map((row)=>{
                return <tr className="listRow" key={row.key} onClick={()=>{onRowClickAssetEvent(row)}}>                    
                      <td className="column"><p className="context">{row.intAssetEventTypeID.strEventCode+"-"+row.intAssetEventTypeID.strEventName}</p></td>
                  <td className="column"><p className="context">{moment(row.dtmDateSubmitted).format("YYYY-MM-DD")}</p></td>
                    </tr>
              })
              :<tr ><td style={{textAlign:"center",fontSize:"14px"}} colSpan="3">No Data!</td></tr>
          
          } */}
          </tbody>

        </table>
      </Scrollbars>
      <div style={{
        color: "rgb(102, 115, 136)",
        fontSize: "10pt",
        background: "#f7f7f7",
        border: "1px solid rgb(241, 243, 246)",
        height: "25px"
      }}>
        <span style={{
          float: "left",
          marginLeft: "4px",
          marginRight: "4px",
          cursor: "pointer",
        }}>
          <img src={newAddImg} onClick={() => setAssetEventModalActive(true)}></img>
        </span>
      </div>


      {/* Metering Modal end */}
      <StockModal
        visible={stockModalActive}
        title={"STOCK"}
        assetId={assetId}
        onCancel={onCancel}
        pageState={stockPageState}
        stockData={stockData}
      />

      {/*  Asset Event Modal */}

      {/* Asset Evemt Modal end */}
    </div>
  );
}
