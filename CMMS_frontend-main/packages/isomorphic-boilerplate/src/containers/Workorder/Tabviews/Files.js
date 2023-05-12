import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import siteConfig from '@iso/config/site.config';
import { Col, Row, Form } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import newAddImg from '../../../assets/images/new-inner-list.png';
import FileUploadModal from '../../../component/FileUploadModal';
import FilesAction from '../../../redux/Files/actions';
export default function(props) {   
  const dispatch = useDispatch();
  const { getFiles } = FilesAction;
  const { fileLists } = useSelector((state) => state.Files);
  const [data, setData] = React.useState([]);
  const [fileUploadModalActive, setFileUploadModalActive] = React.useState(false);
   const columns = [
    {
      title: "Name",
       dataIndex: "originalName",
       rowKey: "originalName",
      width: "30%",  
    },
    {
      title: "Preview",
      dataIndex: "strLink",
      rowKey: "strLink",
      width: "15%",
      render: (text) => {
        var temp=text;
        temp = temp.substr(6,temp.length);
        temp = siteConfig.apiUrl + temp;
        return <a
          onClick={() => {
            window.open(temp,"_blank")
          }}
        >
          {'Click to open'}
        </a>
    },
    },
    {
      title: "File Type",
      dataIndex: "strFileType",
      rowKey: "strFileType",
      width: "15%",
      render: (text) => <span>{text}</span>,
    },    
     {
       title: "File Size",
       dataIndex: "intSize",
       rowKey: "intSize",
       width: "10%",
       render: (text) => <span>{text}</span>,
     },
     {
       title: "Description",
       dataIndex: "strNotes",
       rowKey: "strNotes",
       width: "*",
       render: (text) => <span>{text}</span>,
     },
      
   
  ];
  const handleCancel=()=>{
    setFileUploadModalActive(false);
  }
  const loadSuccess=()=>{
    dispatch(getFiles(props.workorderId));
    setFileUploadModalActive(false);
  }
  React.useEffect(() => {
    dispatch(getFiles(props.workorderId));    
  }, []);

  return (
    <div className="isoInvoiceTable">
     
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
        <TableWrapper
          // rowSelection={rowSelection}
          dataSource={fileLists}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        />
      {/* </Scrollbars> */}
      <div style={{color: "rgb(102, 115, 136)",   
          fontSize: "10pt",
          background: "#f7f7f7",
          border:"1px solid rgb(241, 243, 246)",
          height: "25px"}} >
       <span style={{float: "left",
                      marginLeft:"4px", 
                    marginRight:"4px",
                    cursor:"pointer",
        }} >
          <img src={newAddImg} onClick={() => setFileUploadModalActive(true)}></img>
         </span>        
      </div>
      <FileUploadModal
        visible={fileUploadModalActive}
        loadSuccess={loadSuccess}
        intWorkOrderId={props.workorderId}
        title="Upload file"
        onCancel={handleCancel}
      ></FileUploadModal>
  </div>
  );
}
