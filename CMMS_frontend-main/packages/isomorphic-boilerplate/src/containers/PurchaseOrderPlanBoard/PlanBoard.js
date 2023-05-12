import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
// import notification from '@iso/components/Notification';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Input from '@iso/components/uielements/input';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Button from '@iso/components/uielements/button';
import moment from 'moment';
// import PurchaseOrderAction from '../../redux/purchaseorder/actions';
import Actions from '../../redux/purchaserequest/actions';
import CardWrapper, { Box, StatusTag } from '../Asset/Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import clone from 'clone';

import fakeData from './data';
import PurchasePlanBoardModal from '../../component/PurchaseRequestModal';
import SelectSupplierModal from '../../component/SelectSupplierModal';
import { key } from 'styled-theme';
const dataList = new fakeData(10);

// const { getPurchaseOrderData, deleteData } = PurchaseOrderAction;
const {
  getPurchaseBoards,
  updatePurchaseBoardData,
  editLIneItem,
  deleteData,
  updateData,
  getDataFromBoard,
} = Actions;
const tdStyle = {
  fontSize: '15px',
  color: 'rgb(121, 121, 121)',
  borderBottom: '1px solid rgb(233, 233, 233)',
  padding: '16px',
  whiteSpace: 'nowrap',
};
const tableDataStyle = {
  color: 'rgb(68, 130, 255)',
  transition: 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s',
  whiteSpace: 'nowrap',
};
const trStyle = {
  fontFamily: 'Tahoma,Calibri,Helvetica',
  fontSize: '9pt',
  margin: 0,
  outline: 'none',
  padding: 0,
  verticalAlign: 'top',
};
const thStyle = {
  width: '20%',
  backgroundColor: '#f1f3f6',
  color: 'rgb(120, 129, 149)',
};

const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj['row'][key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

const groupBySupplierName = groupBy('strSupplierName');

const arrayRemove = (arr, value) => {
  return arr.filter(function (ele) {
    return ele != value;
  });
};

export default function (props) {
  // const { pageState, purchaseOrder}=props;
  let history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const {
    planBoards,
    isDelete,
    purchaseItems,
    purchaseItem,
    lineItems,
  } = useSelector((state) => state.purchaseRequest);
  console.log('planBoards==========', planBoards);
  const [filtered, setFiltered] = React.useState({});
  const [boardModalActive, setBoardModalActive] = React.useState(false);
  const [pageSate, setPageSate] = React.useState('Add');
  const [selectedPR, setSelectedPR] = React.useState(null);
  const [
    selectSupplierModalActive,
    setSelectSupplierModalActive,
  ] = React.useState(false);
  const [requestItem, setRequestItem] = React.useState(null);
  const [id, setId] = React.useState(null);

  const [checked, setChecked] = React.useState(false);
  const [checkedItem, setCheckedItem] = React.useState([]);

  React.useEffect(() => {
    dispatch(getDataFromBoard());
  }, []);
  React.useEffect(() => {
    var sendData = {};
    sendData.bolFromPurchaseBoard = false;
    lineItems.map((item, index) => {
      dispatch(updateData(sendData, item._id));
    });
  }, []);
  React.useEffect(() => {
    dispatch(getPurchaseBoards());
  }, []);
  React.useEffect(() => {
    dispatch(getPurchaseBoards());
  }, [purchaseItems]);

  const handleCancel = () => {
    setBoardModalActive(false);
    setSelectSupplierModalActive(false);
  };
  const updatePriceData = (key) => {
    var sendData = {};
    // sendData.intPurchaseOrderID = lineItems[key].intPurchaseOrderID;
    // sendData.strPartName = lineItems[key].strPartName;
    sendData.qtyOnOrder = planBoards[key].qtyOnOrder;
    sendData.dblUnitPrice = planBoards[key].dblUnitPrice;
    // sendData.dblTaxRate = lineItems[key].dblTaxRate;
    dispatch(updatePurchaseBoardData(sendData, planBoards[key]._id));
  };
  const goEditPR = (row) => {
    setPageSate('Edit');
    setSelectedPR(row.row);
    setBoardModalActive(true);
  };

  // const onChange = (pagination, filters, sorter) => {
  //   if (sorter && sorter.columnKey && sorter.order) {
  //     if (sorter.order === 'ascend') {
  //       dataList.getSortAsc(sorter.columnKey, filtered);
  //     } else {
  //       dataList.getSortDesc(sorter.columnKey, filtered);
  //     }
  //     setFiltered(filtered);
  //   }
  //   // setPagination(pagination);
  // };

  const onDelete = () => {
    checkedItem.map((item, index) => {
      dispatch(deleteData(item._id));
    });
  };

  const handleChange = (item) => {
    const found = checkedItem.find(function (element) {
      return element == item;
    });
    const temp = checkedItem;
    if (found == undefined) {
      temp.push(item);
      setChecked(true);
      setCheckedItem(temp);
    } else {
      setChecked(false);
      var result = arrayRemove(temp, item);
      setCheckedItem(result);
      console.log('result', result);
    }
  };
  const filterResult = groupBySupplierName(planBoards);

  const onGenerate = () => {
    var sendData = {};
    sendData.bolFromPurchaseBoard = true;
    checkedItem.map((item, index) => {
      dispatch(updateData(sendData, item._id));
    });
    history.push(`dashboard/purchase_board/purchaseorder_generate/`);
  };
  return (
    <LayoutWrapper>
      <Box>
        <div className="isoInvoiceTableBtn">
          <Button
            type="primary"
            onClick={() => {
              setBoardModalActive(true);
              setPageSate('Add');
            }}
            className="mateAddInvoiceBtn"
          >
            New
          </Button>
        </div>

        <CardWrapper title="Assets">
          <div style={{ overflow: 'scroll hidden' }}>
            <table style={{ width: '100%' }}>
              <thead
                className="ant-table-thead"
                style={{ fontSize: '13px', width: '100%' }}
              >
                <tr>
                  <th
                    style={{
                      width: '3%',
                      border: 'none',
                      backgroundColor: '#f1f3f6',
                    }}
                  ></th>
                  <th
                    style={{
                      width: '10%',
                      textAlign: 'left',
                      backgroundColor: '#f1f3f6',
                      color: 'rgb(120, 129, 149)',
                    }}
                  >
                    code
                  </th>
                  <th style={thStyle}>Requested Item</th>
                  <th style={thStyle}>Part#</th>
                  <th style={thStyle}>Source</th>
                  <th style={thStyle}>Need By</th>
                  <th style={thStyle}>Qty</th>
                  <th style={thStyle}>Unit Price</th>
                  <th style={thStyle}>Line Total</th>
                  <th
                    style={{
                      width: '30%',
                      backgroundColor: '#f1f3f6',
                      color: 'rgb(120, 129, 149)',
                    }}
                  ></th>
                  <th style={thStyle}>Account</th>
                  <th style={thStyle}>Charge Department</th>
                </tr>
              </thead>
              {planBoards != '' ? (
                <>
                  {Object.keys(filterResult).map((key) => {
                    return (
                      <tbody
                        className="ant-table-row ant-table-row-level-0"
                        key={key}
                      >
                        <tr style={{ height: '15px' }}></tr>
                        {key == 'undefined' ? (
                          <tr
                            style={{
                              backgroundColor: '#ffa9aa',
                              width: '100%',
                            }}
                          >
                            <td
                              colSpan="8"
                              style={{
                                fontSize: '15px',
                                borderBottom: '1px solid rgb(233, 233, 233)',
                                padding: '10px',
                                whiteSpace: 'nowrap',
                                color: 'black',
                                verticalAlign: 'middle',
                              }}
                            >
                              No Associated Supplier
                            </td>
                            <td colSpan="4" style={tdStyle}>
                              {checkedItem.filter(
                                (item) => item.row.strSupplierName == undefined
                              ) == '' ? (
                                <Button className="btn" disabled>
                                  delete
                                </Button>
                              ) : (
                                <Button
                                  className="btn"
                                  onClick={() => onDelete()}
                                >
                                  delete
                                </Button>
                              )}
                            </td>
                          </tr>
                        ) : (
                          <tr
                            style={{
                              backgroundColor: '#d4dde6',
                              width: '100%',
                            }}
                          >
                            <td
                              colSpan="6"
                              style={{
                                fontSize: '15px',
                                borderBottom: '1px solid rgb(233, 233, 233)',
                                padding: '10px',
                                whiteSpace: 'nowrap',
                                color: 'rgb(120, 129, 149)',
                                verticalAlign: 'middle',
                              }}
                            >
                              {key}
                            </td>
                            {checkedItem.filter(
                              (item) => item.row.strSupplierName == key
                            ) == '' ? (
                              <>
                                <td style={tdStyle}>
                                  <Button className="btn" disabled>
                                    Request Quote
                                  </Button>
                                </td>
                                <td style={tdStyle}>
                                  <Link
                                    to={`${match.path}/purchaseorder_generate/`}
                                  >
                                    <Button className="btn" disabled>
                                      Generate PO
                                    </Button>
                                  </Link>
                                </td>
                                <td colSpan="4" style={tdStyle}>
                                  <Button
                                    className="btn"
                                    onClick={() => {
                                      onDelete();
                                    }}
                                    disabled
                                  >
                                    delete
                                  </Button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td style={tdStyle}>
                                  <Button className="btn">Request Quote</Button>
                                </td>
                                <td style={tdStyle}>
                                  <Link
                                    to={`${match.path}/purchaseorder_generate`}
                                  >
                                    <Button
                                      className="btn"
                                      onClick={() => {
                                        onGenerate();
                                      }}
                                    >
                                      Generate PO
                                    </Button>
                                  </Link>
                                </td>
                                <td colSpan="4" style={tdStyle}>
                                  <Button
                                    className="btn"
                                    onClick={() => {
                                      onDelete();
                                    }}
                                  >
                                    delete
                                  </Button>
                                </td>
                              </>
                            )}
                          </tr>
                        )}
                        {filterResult[key].map((item, index) => {
                          return (
                            <tr
                              key={index}
                              data-position={index}
                              style={trStyle}
                            >
                              <td style={tdStyle}>
                                {checkedItem.filter(
                                  (tempItem) =>
                                    tempItem.row.strSupplierName !=
                                    item.row.strSupplierName
                                ) == '' ? (
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      handleChange(item);
                                    }}
                                    value={checked}
                                  />
                                ) : (
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      handleChange(item);
                                    }}
                                    disabled
                                  />
                                )}
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    goEditPR(item);
                                  }}
                                  style={tableDataStyle}
                                >
                                  {'PR#' + item._id}
                                </a>
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    goEditPR(item);
                                  }}
                                  style={tableDataStyle}
                                >
                                  {item.requestItem}
                                </a>
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    goEditPR(item);
                                  }}
                                  style={tableDataStyle}
                                >
                                  {item.part}
                                </a>
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    goEditPR(item);
                                  }}
                                  style={tableDataStyle}
                                >
                                  {item.source}
                                </a>
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    goEditPR(item);
                                  }}
                                  style={tableDataStyle}
                                >
                                  {item.row.dtmRequiredByDate
                                    ? moment(item.row.dtmRequiredByDate).format(
                                        'MMM DD YYYY'
                                      )
                                    : ''}
                                </a>
                              </td>
                              <td style={tdStyle}>
                                <Input
                                  placeholder=""
                                  value={item.qtyOnOrder}
                                  onBlur={() => updatePriceData(item.key)}
                                  onChange={(event) => {
                                    planBoards[item.key].qtyOnOrder =
                                      event.target.value;
                                    dispatch(editLIneItem(planBoards));
                                  }}
                                  style={{ width: '100px' }}
                                />
                              </td>
                              <td style={{ display: 'inline' }} style={tdStyle}>
                                $
                                <Input
                                  placeholder=""
                                  value={item.dblUnitPrice}
                                  onBlur={() => updatePriceData(item.key)}
                                  onChange={(event) => {
                                    planBoards[item.key].dblUnitPrice =
                                      event.target.value;
                                    dispatch(editLIneItem(planBoards));
                                  }}
                                  style={{ width: '100px' }}
                                />
                              </td>
                              <td style={tdStyle}>
                                <span style={{ fontWeight: 'bold' }}>
                                  ${' '}
                                  {(
                                    parseInt(item.qtyOnOrder) *
                                    parseFloat(
                                      item.dblUnitPrice != ''
                                        ? item.dblUnitPrice
                                        : 0
                                    )
                                  ).toFixed(2)}
                                </span>
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    setSelectSupplierModalActive(true);
                                    setRequestItem(item.requestItem);
                                    setId(item._id);
                                  }}
                                  style={tableDataStyle}
                                >
                                  {item.row.strSupplierName == undefined
                                    ? 'Select Supplier'
                                    : 'Change Supplier'}
                                </a>
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    goEditPR(item);
                                  }}
                                  style={tableDataStyle}
                                >
                                  <span>{item.account}</span>
                                </a>
                              </td>
                              <td style={tdStyle}>
                                <a
                                  onClick={() => {
                                    goEditPR(item);
                                  }}
                                  style={tableDataStyle}
                                >
                                  <span>{item.chargeDepartment}</span>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    );
                  })}
                </>
              ) : (
                <tbody className="ant-table-row ant-table-row-level-0">
                  <tr className="ant-table-placeholder">
                    <td colSpan="14">
                      <div className="ant-empty ant-empty-normal">
                        <div className="ant-empty-image">
                          <svg
                            className="ant-empty-img-simple"
                            width="64"
                            height="41"
                            viewBox="0 0 64 41"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              transform="translate(0 1)"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <ellipse
                                className="ant-empty-img-simple-ellipse"
                                cx="32"
                                cy="33"
                                rx="32"
                                ry="7"
                              ></ellipse>
                              <g
                                className="ant-empty-img-simple-g"
                                fillRule="nonzero"
                              >
                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                <path
                                  d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                  className="ant-empty-img-simple-path"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p
                          className="ant-empty-description"
                          data-nsfw-filter-status="swf"
                        >
                          No Data
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </CardWrapper>
      </Box>
      <PurchasePlanBoardModal
        onCancel={handleCancel}
        visible={boardModalActive}
        title="PURCHASE REQUEST"
        pageState={pageSate}
        intPurchaseOrderID={null}
        bolAddedDirectlyToPurchaseOrder={false}
        selectedPR={selectedPR}
      ></PurchasePlanBoardModal>
      <SelectSupplierModal
        onCancel={handleCancel}
        visible={selectSupplierModalActive}
        title="Asset Business"
        data={requestItem}
        selectedid={id}
      ></SelectSupplierModal>
    </LayoutWrapper>
  );
}
