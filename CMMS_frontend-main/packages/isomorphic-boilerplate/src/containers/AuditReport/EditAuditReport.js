import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import { DatePicker, message } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { TableTabsStyle } from './Asset.styles';
// import workorderAction from "../../redux/workorder/actions";
import { Col, Row, Form } from 'antd';
import moment from 'moment';
import { direction } from '@iso/lib/helpers/rtl';
import AssetModal from '../../component/AssetModal';
import AuditorModal from '../../component/UsersContentModal';
import AuditeeModal from '../../component/UsersContentModal';
import auditReportAction from '../../redux/auditreport/actions';

import {
  Fieldset,
  // Form,
  Label,
} from '../Asset/Facility/OnlineContent.styles';
const FormItem = Form.Item;
const { updateData, getById, deleteData } = auditReportAction;
function callback(key) {}

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const gutter = 16;
const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

export default function (props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();
  // const { redirectPath } = props;
  const { isDelete, auditReport } = useSelector((state) => state.AuditReport);
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [auditorModalActive, setAuditorModalActive] = React.useState(false);
  const [auditeeModalActive, setAuditeeModalActive] = React.useState(false);

  const [
    strInternalSmsAuditReport,
    setStrInternalSmsAuditReport,
  ] = React.useState('');
  const [aDate, setADate] = React.useState(null);
  const [intDepartmentVessel, setIntDepartmentVessel] = React.useState('');
  const [strDepartmentVessel, setStrDepartmentVessel] = React.useState('');
  const [strAuditNo, setStrAuditNo] = React.useState('');
  const [strNCRCARNo, setStrNCRCARNo] = React.useState('');
  const [intAuditor, setIntAuditor] = React.useState(null);
  const [strAuditorName, setStrAuditorName] = React.useState('');
  const [strNCStatement, setStrNCStatement] = React.useState('');

  const [strAuditeeName, setStrAuditeeName] = React.useState('');
  const [intAuditorAuditee, setIntAuditorAuditee] = React.useState(null);
  const [strImmediateAction, setStrImmediateAction] = React.useState('');
  const [
    aImmediateCompletionDate,
    setAImmediateCompletionDate,
  ] = React.useState(null);
  const [strFurtherAction, setStrFurtherAction] = React.useState('');
  const [aFurtherCompletionDate, setAFurtherCompletionDate] = React.useState(
    null
  );
  const [strFollowUpDetail, setStrFollowUpDetail] = React.useState('');
  const [strCorrectiveAction, setStrCorrectiveAction] = React.useState('');
  const [strISMReference, setStrISMReference] = React.useState('');
  const [strSMSReference, setStrSMSReference] = React.useState('');
  // React.useEffect(() => {
  //   if (isSaved) {
  //     history.push('/dashboard/audit');
  //   }
  // }, [isSaved]);
  React.useEffect(() => {
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    console.log(auditReport, 'auditReport');
    setStrInternalSmsAuditReport(auditReport.strInternalSmsAuditReport);
    setADate(
      auditReport.aDate ? moment(auditReport.aDate).format('YYYY-MM-DD') : null
    );
    setIntDepartmentVessel(
      auditReport.intDepartmentVessel
        ? auditReport.intDepartmentVessel._id
        : null
    );
    setStrDepartmentVessel(
      auditReport.intDepartmentVessel
        ? auditReport.intDepartmentVessel.strName
        : ''
    );
    setStrAuditNo(auditReport.strAuditNo);
    setStrNCRCARNo(auditReport.strNCRCARNo);
    setIntAuditor(auditReport.intAuditor);
    setStrAuditorName(
      auditReport.intAuditor ? auditReport.intAuditor.strFullName : ''
    );
    setStrNCStatement(auditReport.strNCStatement);
    setStrAuditeeName(
      auditReport.intAuditorAuditee
        ? auditReport.intAuditorAuditee.strFullName
        : ''
    );
    setIntAuditorAuditee(auditReport.intAuditorAuditee);
    setIntAuditorAuditee(auditReport.intAuditorAuditee);
    setStrISMReference(auditReport.strISMReference);
    setStrSMSReference(auditReport.strSMSReference);
    setStrImmediateAction(auditReport.strImmediateAction);
    setAImmediateCompletionDate(
      auditReport.aImmediateCompletionDate
        ? moment(auditReport.aImmediateCompletionDate).format('YYYY-MM-DD')
        : null
    );
    setStrFurtherAction(auditReport.strFurtherAction);
    setAFurtherCompletionDate(
      auditReport.aFurtherCompletionDate
        ? moment(auditReport.aFurtherCompletionDate).format('YYYY-MM-DD')
        : null
    );
    setStrFollowUpDetail(auditReport.strFollowUpDetail);
    setStrCorrectiveAction(auditReport.strCorrectiveAction);
  }, [auditReport]);
  const handleCancel = () => {
    setAssetModalActive(false);
    setAuditorModalActive(false);
    setAuditeeModalActive(false);
  };
  const onSave = () => {
    if (strInternalSmsAuditReport == '') {
      message.error('Please put Internal SMS Audit Report');
      return;
    }
    var sendData = {};
    sendData.strInternalSmsAuditReport = strInternalSmsAuditReport;
    sendData.aDate = new Date(aDate);
    sendData.intDepartmentVessel = intDepartmentVessel;
    sendData.strAuditNo = strAuditNo;
    sendData.intAuditor = intAuditor;
    sendData.strNCRCARNo = strNCRCARNo;
    sendData.intAuditorAuditee = intAuditorAuditee;
    sendData.strISMReference = strISMReference;
    sendData.strNCStatement = strNCStatement;
    sendData.strSMSReference = strSMSReference;
    sendData.strNCStatement = strNCStatement;
    sendData.strImmediateAction = strImmediateAction;
    sendData.aImmediateCompletionDate = new Date(aImmediateCompletionDate);
    sendData.strFurtherAction = strFurtherAction;
    sendData.aFurtherCompletionDate = new Date(aFurtherCompletionDate);
    sendData.strFollowUpDetail = strFollowUpDetail;
    sendData.strCorrectiveAction = strCorrectiveAction;
    dispatch(updateData(sendData, id));
  };
  const selectedAsset = (row) => {
    setStrDepartmentVessel(row.strName);
    setIntDepartmentVessel(row._id);
  };
  const selectAuditor = (row) => {
    setStrAuditorName(
      row.bolGroup
        ? "Any member of the '" + row.strFullName + "' grop"
        : row.strFullName
    );
    setIntAuditor(row._id);
  };

  const selectAuditee = (row) => {
    setStrAuditeeName(
      row.bolGroup
        ? "Any member of the '" + row.strFullName + "' grop"
        : row.strFullName
    );
    setIntAuditorAuditee(row._id);
  };
  const onDelete = (row) => {
    dispatch(deleteData(id));
  };
  React.useEffect(() => {
    if (isDelete) {
      history.push('/dashboard/auditreport');
    }
  }, [isDelete]);
  return (
    <LayoutWrapper>
      <div className="PageHeader">
        <Link to={'/dashboard/auditreport'} style={margin}>
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link>
        <Button
          type="primary"
          onClick={onSave}
          className="saveBtn"
          style={margin}
        >
          <span>Save</span>
        </Button>
        <Button type="danger" className="saveBtn" onClick={onDelete}>
          <span>Delete</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>Nonconformities:</h4>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={20} sm={20} xs={24} style={colStyle}>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={10} sm={10} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Internal SMS Audit Report</Label>
                    <Input
                      label="Internal SMS Audit Report"
                      placeholder=""
                      value={strInternalSmsAuditReport}
                      onChange={(event) => {
                        setStrInternalSmsAuditReport(event.target.value);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date</Label>
                    <DatePicker
                      value={
                        aDate != null
                          ? moment(aDate, 'YYYY-MM-DD HH:mm:ss')
                          : ''
                      }
                      onChange={(value, dataString) => {
                        setADate(dataString);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={8} sm={8} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Department/Vessel</Label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        label="Vessel"
                        placeholder=""
                        value={strDepartmentVessel}
                        onChange={() => setAssetModalActive(true)}
                        style={{ width: '90%' }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setAssetModalActive(true);
                        }}
                        style={{
                          fontSize: '25px',
                          cursor: 'pointer',
                          position: 'absolute',
                          marginLeft: '5px',
                        }}
                      ></i>
                    </div>
                  </Fieldset>
                </Form>
              </Col>
            </Row>

            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Audit No.</Label>
                    <Input
                      label="Audit No."
                      onChange={(event) => setStrAuditNo(event.target.value)}
                      placeholder=""
                      value={strAuditNo}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Auditor</Label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        label="Auditor"
                        placeholder=""
                        value={strAuditorName}
                        style={{ width: '90%' }}
                        onChange={() => setAuditorModalActive(true)}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setAuditorModalActive(true);
                        }}
                        style={{
                          fontSize: '25px',
                          cursor: 'pointer',
                          position: 'absolute',
                          marginLeft: '4px',
                        }}
                      ></i>
                    </div>
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>NCR/CAR No.</Label>
                    <Input
                      label="NCR/CAR No."
                      placeholder=""
                      onChange={(event) => {
                        setStrNCRCARNo(event.target.value);
                      }}
                      value={strNCRCARNo}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Auditee</Label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        label="Auditee"
                        placeholder=""
                        value={strAuditeeName}
                        onChange={(event) => {
                          setAuditeeModalActive(event.target.value);
                        }}
                        style={{ width: '90%' }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setAuditeeModalActive(true);
                        }}
                        style={{
                          fontSize: '25px',
                          cursor: 'pointer',
                          position: 'absolute',
                          marginLeft: '4px',
                        }}
                      ></i>
                    </div>
                  </Fieldset>
                </Form>
              </Col>
            </Row>

            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={12} sm={12} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>ISM Reference</Label>
                    <Input
                      label="ISM Reference"
                      placeholder=""
                      onChange={(event) => {
                        setStrISMReference(event.target.value);
                      }}
                      value={strISMReference}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={12} sm={12} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>SMS Reference</Label>
                    <Input
                      label="ISM Reference"
                      onChange={(event) => {
                        setStrSMSReference(event.target.value);
                      }}
                      placeholder=""
                      value={strSMSReference}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={12} sm={12} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Non-conformity Statement</Label>
                    <Textarea
                      placeholder=""
                      style={{ height: 'auto' }}
                      rows={2}
                      value={strNCStatement}
                      onChange={(event) => {
                        setStrNCStatement(event.target.value);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <div
              style={{
                borderBottom: '1px solid #E9E9E9',
                paddingBottom: '5px',
                marginBottom: '10px',
              }}
            ></div>
            <Label style={{ fontWeight: 'bold' }}>
              Proposed Corrective Action
            </Label>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={14} sm={14} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Immediate Action(s)</Label>
                    <Input
                      placeholder=""
                      value={strImmediateAction}
                      onChange={(event) =>
                        setStrImmediateAction(event.target.value)
                      }
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date for completion</Label>
                    <DatePicker
                      value={
                        aImmediateCompletionDate != null
                          ? moment(
                              aImmediateCompletionDate,
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : ''
                      }
                      onChange={(value, dataString) => {
                        setAImmediateCompletionDate(dataString);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={14} sm={14} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Further Action(s)</Label>
                    <Textarea
                      placeholder=""
                      style={{ height: 'auto' }}
                      rows={2}
                      value={strFurtherAction}
                      onChange={(event) => {
                        setStrFurtherAction(event.target.value);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={4} sm={4} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Date for completion</Label>
                    <DatePicker
                      value={
                        aFurtherCompletionDate != null
                          ? moment(
                              aFurtherCompletionDate,
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : ''
                      }
                      onChange={(value, dataString) => {
                        setAFurtherCompletionDate(dataString);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <div
              style={{
                borderBottom: '1px solid #E9E9E9',
                paddingBottom: '5px',
                marginBottom: '10px',
              }}
            ></div>
            <Label style={{ fontWeight: 'bold' }}>
              Verification of Corrective Action
            </Label>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={18} sm={18} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Follow Up Details:</Label>
                    <Textarea
                      placeholder=""
                      style={{ height: 'auto' }}
                      rows={2}
                      value={strFollowUpDetail}
                      onChange={(event) => {
                        setStrFollowUpDetail(event.target.value);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={18} sm={18} xs={12} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Corrective Action(s) Closed Out</Label>
                    <Input
                      placeholder=""
                      value={strCorrectiveAction}
                      onChange={(event) =>
                        setStrCorrectiveAction(event.target.value)
                      }
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </TableTabsStyle>
      <AssetModal
        visible={assetModalActive}
        title="ASSETS"
        selectedAsset={selectedAsset}
        onCancel={handleCancel}
      ></AssetModal>
      <AuditorModal
        visible={auditorModalActive}
        title="Auditor"
        group="all"
        selectUser={selectAuditor}
        onCancel={handleCancel}
      />
      <AuditeeModal
        visible={auditeeModalActive}
        title="Auditee"
        group="all"
        selectUser={selectAuditee}
        onCancel={handleCancel}
      />
    </LayoutWrapper>
  );
}
