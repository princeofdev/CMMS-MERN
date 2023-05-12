import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from 'antd';
import './table.css';

import Actions from '../redux/currency/actions';

const { getCurrencyData } = Actions;

export default function (props) {
  const { currencies } = useSelector((state) => state.Currency);
  const { visible, title, group } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrencyData());
  }, []);

  const onRowClick = (row) => {
    props.onCancel();
    props.selectedCurrency(row);
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
                <span className="listHeaderLabel35">Currency</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Name</span>
              </th>
              <th>
                <span className="listHeaderLabel35">ISO Code</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currencies ? (
              currencies.map((data, index) => {
                return (
                  <tr
                    className="listRow"
                    onClick={() => {
                      onRowClick(data);
                    }}
                    key={index}
                  >
                    <td className="column">
                      <p className="context">{data.strCurrency}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strName}</p>
                    </td>
                    <td className="column">
                      <p className="context">{data.strISOCode}</p>
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
