import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from 'antd';
import './table.css';

import businessActions from '../redux/businesses/actions';

const { getBusinessData } = businessActions;

export default function (props) {
  const business = useSelector((state) => state.Businesses.businesses);
  const { visible, title, group } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBusinessData());
  }, []);

  const onRowClick = (row) => {
    props.onCancel();
    props.selectBusiness(row);
  };

  return (
    <Modal
      visible={visible}
      onCancel={props.onCancel}
      title={title}
      width={700}
    >
      <div style={{ marginTop: '3px', height: '170px', overflow: 'auto' }}>
        <table style={{ overflow: 'auto' }}>
          <thead>
            <tr>
              <th>
                <span className="listHeaderLabel35">Business</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Address</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Classification</span>
              </th>
              <th>
                <span className="listHeaderLabel35">City</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Code</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Fax</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Phone</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Postal Code</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Contact</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Currency</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Primary Email</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Secondary Email</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Website</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {business ? (
              business.map((data, index) => {
                return (
                  <tr
                    className="listRow"
                    onClick={() => {
                      onRowClick(data);
                    }}
                    key={index}
                  >
                    <td className="column">
                      <p className="context">{data.strName}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strAddress}</p>
                    </td>
                    <td className="column">
                      <p className="context">
                        {data.strBusinessClassification}
                      </p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strCity}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strCode}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strFax}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strPhone}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strPostalCode}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strPrimaryContact}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strPrimaryCurrency}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strPrimaryEmail}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strSecondaryEmail}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strWebSite}</p>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  style={{ textAlign: 'center', fontSize: '14px' }}
                  colSpan="2"
                >
                  No Data!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
