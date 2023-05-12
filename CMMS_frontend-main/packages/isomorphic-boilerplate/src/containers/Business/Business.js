import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Button from '@iso/components/uielements/button';
import { Col, Row } from 'antd';
import clone from 'clone';
import TableWrapper from '../../component/AntTables.styles';
import CardWrapper, { Box } from '../Businesses/Asset.styles';
import businessAction from '../../redux/business/actions';
import fakeData from '../Businesses/data';

const dataList = new fakeData(10);
const { getData } = businessAction;

export default function Businesses() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const [filtered, setFiltered] = React.useState([]);

  const { business, isDelete } = useSelector((state) => state.Business);
  const goDetail = (id) => {
    history.push(`/dashboard/business/edit/${id}`);
  };

  useEffect(() => {   
    dispatch(getData());
  }, []);

  useEffect(() => {
    if (isDelete) {
      dispatch(getData());
    }
  }, [isDelete]);

  useEffect(() => {
    console.log(business,'business');
    setFiltered(business);
  }, [business]);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'strCode',
      key: 'strCode',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'strName',
      key: 'strName',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Phone',
      dataIndex: 'strPhone',
      key: 'strPhone',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'strAddress',
      key: 'strAddress',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'city',
      dataIndex: 'strCity',
      key: 'strCity',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Province',
      dataIndex: 'strProvince',
      key: 'strProvince',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Country',
      dataIndex: 'intCountryID',
      key: 'intCountryID',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Sys Code',
      dataIndex: 'strCode',
      key: 'strCode',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Primary Currency',
      dataIndex: 'strPrimaryCurrency',
      key: 'strPrimaryCurrency',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Fax',
      dataIndex: 'strFax',
      key: 'strFax',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Notes',
      dataIndex: 'strNotes',
      key: 'strNotes',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Phone 2',
      dataIndex: 'strPhone2',
      key: 'strPhone2',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Postal Code',
      dataIndex: 'strPostalCode',
      key: 'strPostalCode',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Primary Contact',
      dataIndex: 'strPrimaryContact',
      key: 'strPrimaryContact',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Primary Email',
      dataIndex: 'strPrimaryEmail',
      key: 'strPrimaryEmail',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Secondary Email',
      dataIndex: 'strSecondaryEmail',
      key: 'strSecondaryEmail',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Web Site',
      dataIndex: 'strWebSite',
      key: 'strWebSite',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Updated',
      dataIndex: 'intUpdated',
      key: 'intUpdated',
      // width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },
  ];

  const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: true },
    { ...columns[4], sorter: true },
    { ...columns[5], sorter: true },
    { ...columns[6], sorter: true },
    { ...columns[7], sorter: true },
    { ...columns[8], sorter: true },
    { ...columns[9], sorter: true },
    { ...columns[10], sorter: true },
    { ...columns[11], sorter: true },
    { ...columns[12], sorter: true },
    { ...columns[13], sorter: true },
    { ...columns[14], sorter: true },
    { ...columns[15], sorter: true },
    { ...columns[16], sorter: true },
    { ...columns[17], sorter: true },
    { ...columns[19], sorter: true },
  ];

  const onChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey, filtered);
      } else {
        dataList.getSortDesc(sorter.columnKey, filtered);
      }
      setFiltered(filtered);
    }
  };

  // useEffect(() => {
  //   if(isDelete) {
  //     dispatch(getBusinessData())
  //   }
  // }, [isDelete]);

  return (
    <div>
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id="sidebar.businesses" />
        </PageHeader>
        <Box>
          <Row style={{ paddingBottom: '10px' }}>
            <Col md={4} sm={4} xs={12}>
              <Link to={`${match.path}/add`}>
                <Button type="primary" className="mateAddInvoiceBtn">
                  New
                </Button>
              </Link>
            </Col>
          </Row>
          <TableWrapper
            dataSource={filtered}
            // columns={clone(sortColumns)}
            columns={columns}
            pagination={true}
            pagination={{ pageSize: 20 }}
            onChange={onChange}
            className="isoSortingTable"
          />
        </Box>
      </LayoutWrapper>
    </div>
  );
}
