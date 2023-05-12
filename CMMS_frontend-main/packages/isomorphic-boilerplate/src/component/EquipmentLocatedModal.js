import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import assetActions from '../redux/asset/actions';
import { Col, Row } from 'antd';
import AssetCategoryModal from './AssetCategoryModal';

import './table.css';
import { FormattedNumberParts } from 'react-intl';
const { initData, deleteData, createNumber, getAssetByFilter } = assetActions;

export default function (props) {
  const { visible, title } = props;

  const [assetFacilities, setAssetFacilities] = useState([]);
  const [assetFiltered, setAssetFiltered] = React.useState([]);
  const [assetCategoryActive, setAssetCategoryActive] = useState(false);
  const [filterName, setFilterName] = useState('filter by Category : Assets');

  const [strSearchVal, setStrSearchVal] = useState('');

  const { assets, isDelete, rawAssets } = useSelector((state) => state.Assets);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initData());
  }, []);

  React.useEffect(() => {
    let facilities = [];
    assets.map((data) => {
      if (data.intCategoryKind === 1) facilities.push(data);
    });
    setAssetFacilities(facilities);
  }, [assets]);

  React.useEffect(() => {
    let facilities = [];
    assets.map((data) => {
      if (data.intCategoryKind === 1) facilities.push(data);
    });

    if (strSearchVal == '') {
      var tree = makeTree(facilities);
      setAssetFacilities(tree);
    } else {
      setAssetFacilities(rawAssets);
      setAssetFiltered(rawAssets);
    }
  }, [visible]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'strName',
      key: 'strName',
      render: (text, row) => <span>{text}</span>,
    },
    {
      title: 'Code',
      dataIndex: 'strCode',
      key: 'strCode',
      render: (text, row) => <span>{text}</span>,
    },
    {
      title: 'Asset Status',
      dataIndex: 'bolIsOnline',
      key: 'bolIsOnline',
      render: (text, row) => {
        let statue;
        if (text === true) {
          statue = 'Online';
        } else {
          statue = 'Offline';
        }
        return <span>{statue}</span>;
      },
    },
  ];

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
        if (
          mappedElem.parentid &&
          mappedArr[mappedElem['parentid']] !== undefined
        ) {
          mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      props.selectEquipLocatedId(record);
      props.onCancel();
    },
  };

  const goSearch = (event) => {
    var temp_asset = [];
    for (var i = 0; i < rawAssets.length; i++) {
      // console.log(rawAssets[i]);
      if (rawAssets[i].strName.includes(event.target.value)) {
        temp_asset.push(rawAssets[i]);
      }
    }
    setAssetFiltered(temp_asset);
    setStrSearchVal(event.target.value);
  };

  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    marginTop: '-20px',
    background: '#e0e7ed',
    height: '38px',
    paddingTop: '2px',
    borderBottom: '1px solid rgb(174,193,208)',
    marginLeft: '2px',
  };

  const [data, setData] = React.useState([]);

  const onRowClick = (row) => {
    props.onCancel();
    props.selectEquipLocatedId(row);
  };

  const handleCancel = () => {
    setAssetCategoryActive(false);
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

    if (selectNode.intSysCode == 0) {
      dispatch(initData());
      // setViewOption(1);
    } else {
      // setViewOption(2);
      dispatch(getAssetByFilter(parentIds.join(',')));
    }

    //setFilterIds(parentIds);
    setAssetCategoryActive(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        title={title}
        width={700}
        footer={null}
        onCancel={props.onCancel}
      >
        <div>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={15} sm={15} xs={24}>
              <div style={{ position: 'relative', width: '95%' }}>
                <Input
                  value={filterName}
                  placeholder=""
                  style={{ width: '280px' }}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setAssetCategoryActive(true);
                  }}
                  style={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    position: 'absolute',
                    marginTop: '5px',
                    marginLeft: '5px',
                  }}
                ></i>
              </div>
            </Col>
            <Col md={1} sm={1} xs={24}></Col>
            <Col md={8} sm={8} xs={24}>
              <InputSearch
                placeholder="input search text"
                value={strSearchVal}
                onChange={(event) => goSearch(event)}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: '3px', overflow: 'auto', height: '300px' }}>
          {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        /> */}
          {strSearchVal == '' ? (
            <TableWrapper
              // rowSelection={rowSelection}
              dataSource={assetFacilities}
              columns={columns}
              rowSelection={{ ...rowSelection, type: 'radio' }}
              pagination={false}
              className="invoiceListTable"
            />
          ) : (
            <TableWrapper
              rowSelection={{ ...rowSelection, type: 'radio' }}
              dataSource={assetFiltered}
              columns={columns}
              pagination={false}
            />
          )}
          {/* <table style={{ overflow: "auto" }}>
          <thead>
            <tr>
              <th style={{ width: "30%" }}>
                <span className="listHeaderLabel35">Name</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Code</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Asset Status</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Asset Parent</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.length != 0 ? (
              assets.map((row) => {
                return row.intCategoryKind == 1 ? (
                  <tr
                    className="listRow"
                    key={row.key}
                    onClick={() => {
                      onRowClick(row);
                    }}
                  >
                    <td className="column">
                      <p className="context">{row.strName}</p>
                    </td>
                    <td className="column">
                      <p className="context">{row.strCode}</p>
                    </td>
                    <td className="column">
                      <p className="context">
                        {row.bolIsOnline ? "Online" : "Offline"}
                      </p>
                    </td>
                    <td className="column">
                      <p className="context"></p>
                    </td>
                  </tr>
                ) : (
                  <tr key={row.key}></tr>
                );
              })
            ) : (
              <tr>
                <td
                  style={{ textAlign: "center", fontSize: "14px" }}
                  colSpan="4"
                >
                  No Data!
                </td>
              </tr>
            )}
          </tbody>
        </table> */}
        </div>
      </Modal>

      <AssetCategoryModal
        visible={assetCategoryActive}
        selectedCategory={selectedCategory}
        parentKind={'Assets'}
        onCancel={handleCancel}
        title={'ASSET CATEGORIES'}
      ></AssetCategoryModal>
    </>
  );
}
