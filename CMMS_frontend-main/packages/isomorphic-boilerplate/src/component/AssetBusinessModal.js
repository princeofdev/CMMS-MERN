import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input, { Textarea, InputSearch } from "@iso/components/uielements/input";
import Modal from "@iso/components/Feedback/Modal";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";
import { Col, Row } from "antd";
import notification from "@iso/components/Notification";
import AssetModal from "./AssetModal";
import BusinessTypeModal from "./BusinessTypeModal";
import BusinessModal from "./BusinessModal";

import "./table.css";
import { ActionBtn, Fieldset, Form, Label } from "./UsersContentModal.styles";

import AssetBusinessAction from "../redux/assetbusiness/actions";

const businessTypes = {
  1: "Supplier",
  2: "Manufacture",
  3: "Service Provider",
  4: "Owner",
  5: "Customer",
};
export default function (props) {
  const {
    visible,
    title,
    // businessName,
    businessId,
    // pageState,
    assetBusinessId,
    assetBusiness,
    assetName,
  } = props;
  const { add, updateData } = AssetBusinessAction;
  const dispatch = useDispatch();
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [assetTxt, setAssetTxt] = React.useState("");
  const [businessTypeModalActive, setBusinessTypeModalActive] = React.useState(
    false
  );
  const [businessModal, setBusinessModal] = React.useState(false);
  const [supplierPartNumber, setSupplierPartNumber] = React.useState(""); //strBusinessAssetNumber
  const [assetId, setAssetId] = React.useState(null);
  const [strCategory, setStrCategory] = React.useState("");
  const [intBusinessRoleTypeID, setintBusinessRoleTypeID] = React.useState(
    null
  );
  const [strBusinessType, setStrBusinessType] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [businessGroupName, setBusinessGroupName] = React.useState("");
  const [pageState, setPageState] = React.useState("");
  const [bolPreferredVendor, setBolPreferredVendor] = React.useState(false);
  const [intAssetBusinessId, setIntAssetBusinessId] = React.useState(null);

  // React.useEffect(() => {
  //   // dispatch(initData());
  //   if (pageState == "edit") {
  //     setAssetTxt(
  //       assetBusiness.intAssetID.strName +
  //         "(" +
  //         assetBusiness.intAssetID.strCode +
  //         ")"
  //     );
  //     setAssetId(assetBusiness.intAssetID._id);
  //     setStrBusinessType(businessTypes[assetBusiness.intBusinessRoleTypeID]);
  //     setintBusinessRoleTypeID(assetBusiness.intBusinessRoleTypeID);
  //     setSupplierPartNumber(assetBusiness.strBusinessAssetNumber);
  //     setStrCategory(assetBusiness.strCategory);
  //     setBolPreferredVendor(assetBusiness.bolPreferredVendor);
  //     setIntAssetBusinessId(assetBusiness._id);
  //   } else {
  //     setAssetTxt("");
  //     setAssetId(null);
  //     setStrBusinessType("");
  //     setintBusinessRoleTypeID(null);
  //     setSupplierPartNumber("");
  //     setStrCategory("");
  //     setBolPreferredVendor(false);
  //   }
  // }, [pageState, assetBusiness]);

  const handleCancel = () => {
    setAssetModalActive(false);
    setBusinessTypeModalActive(false);
  };

  const onSave = () => {
    // if (assetId == null) {
    //   notification("info", "Please select an  asset");
    //   return;
    // }

    if (strBusinessType == "") {
      notification("info", "Please select a  business");
      return;
    }
    var sendData = {};
    sendData.intBusinessID = businessId;
    sendData.businessName = businessName;
    sendData.intBusinessRoleTypeID = intBusinessRoleTypeID;
    sendData.businessGroupName = businessGroupName;
    sendData.assetName = assetName;
    // sendData.intAssetID = assetId;
    // sendData.bolPreferredVendor = bolPreferredVendor;
    // sendData.strBusinessAssetNumber = supplierPartNumber;
    // sendData.strCategory = strCategory;
    console.log(sendData);
    if (pageState == "edit") dispatch(updateData(sendData, assetBusinessId));
    else dispatch(add(sendData));
    props.onCancel();
  };

  const selectedAsset = (row) => {
    setAssetTxt(row.strName + "(" + row.strCode + ")");
    setAssetId(row._id);
  };

  const selectedBusinessType = (row) => {
    setStrBusinessType(businessTypes[row]);
    setintBusinessRoleTypeID(row);
    setBusinessGroupName(businessTypes[row]);
  };

  const selectBusiness = (row) => {
    setBusinessName(row.strName);
  }

  const handleOnChange = (event) => {
    setBolPreferredVendor(event.target.checked);
  };

  const handleBusinessCancel = () => {
    setBusinessModal(false);
  }

  useEffect(() => {
    setBusinessName(props.businessName);
    setBusinessGroupName(props.businessGroupName);
    setPageState(props.pageState);
  }, [props]);

  return (
    <div>
      <Modal
        visible={visible}
        width={350}
        onClose={props.onCancel}
        title={title}
        onOk={onSave}
        onCancel={props.onCancel}
      >
        <div>
          <Form>
            <Fieldset>
              <Label>Asset</Label>
              <div style={{ position: "relative" }}>
                <Input
                  style={{ width: "90%" }}
                  value={assetName}
                  onChange={() => setAssetModalActive(true)}
                  placeholder=""
                  disabled
                />
                {/* <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setAssetModalActive(true);
                  }}
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    marginLeft: "3px",
                  }}
                ></i> */}
              </div>
            </Fieldset>

            <Fieldset>
              <Label>Business</Label>
              <div style={{ position: "relative" }}>
                <Input
                  label="Facility"
                  style={{ width: "90%" }}
                  value={businessName}
                  onChange={() => setBusinessTypeModalActive(true)}
                  placeholder=""
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setBusinessModal(true);
                  }}
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    marginLeft: "3px",
                  }}
                ></i>
              </div>
            </Fieldset>

            <Fieldset>
              <Label>Business Group</Label>
              <div style={{ position: "relative" }}>
                <Input
                  label="Facility"
                  style={{ width: "90%" }}
                  value={businessGroupName}
                  onChange={() => setBusinessTypeModalActive(true)}
                  placeholder=""
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setBusinessTypeModalActive(true);
                  }}
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    marginLeft: "3px",
                  }}
                ></i>
              </div>
            </Fieldset>
            {/* <Fieldset>
            <Label>Supplier Part Number</Label>
            <Input
                label="Supplier Part Number"
                placeholder=""       
                value={supplierPartNumber}  
                onChange={(event)=>setSupplierPartNumber(event.target.value)}    
            />
          </Fieldset>
          <Fieldset>
            <Label>Category</Label>
            <Input
                label="Category"
                placeholder=""       
                value={strCategory}  
                onChange={(event)=>setStrCategory(event.target.value)}    
            />
          </Fieldset> */}

            {/* <Fieldset>
              <Checkbox checked={bolPreferredVendor} onChange={handleOnChange}>
                This is my preferred vendor
              </Checkbox>
            </Fieldset> */}
          </Form>
        </div>
      </Modal>
      {/* 
      <AssetModal
        visible={assetModalActive}
        onCancel={handleCancel}
        title={"Asset"}
        selectedAsset={selectedAsset}
      ></AssetModal> */}
      <BusinessTypeModal
        onCancel={handleCancel}
        title={"BUSINESS TYPE"}
        selectedBusinessType={selectedBusinessType}
        visible={businessTypeModalActive}
      ></BusinessTypeModal>

      <BusinessModal
        visible={businessModal}
        title="Business"
        selectBusiness={selectBusiness}
        onCancel={handleBusinessCancel}
      />
    </div>
  );
}
