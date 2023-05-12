import React, { useEffect, useState } from 'react';
import Button from '@iso/components/uielements/button';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea } from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { stringToPosetiveInt } from '@iso/lib/helpers/utility';
import { TimePicker } from 'antd';
import moment from 'moment';
import Table from './TableStyle';
import userAction from '../../redux/user/actions';
import codeTypeAction from '../../redux/codetype/actions';
import itemTypeAction from '../../redux/itemtype/actions';
import { render } from 'nprogress';
const { getAllUserData } = userAction;
const { initCodeData } = codeTypeAction;
const { initItemData } = itemTypeAction;
const Option = SelectOption;

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const CrewComplimentTable = ({ editableData, editTable, updateValues }) => {
  // const { invoiceList } = editableData;
  const { users } = useSelector((state) => state.Users);

  const [userList, setUserList] = React.useState([]);
  const [userPosition, setUserPosition] = React.useState({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllUserData());
  }, []);
  React.useEffect(() => {
    let temp = [];
    let temp_posistion = {};
    users.map((row) => {
      if (!row.bolGroup) {
        temp_posistion[row.strFullName] = row.strUserTitle;
        temp.push(row);
      }
    });
    setUserList(temp);
    setUserPosition(temp_posistion);
    console.log('aaaaaaaaaaaaaaaaaaaaa', temp_posistion);
  }, [users]);

  const [list, setList] = React.useState([]);
  useEffect(() => {
    setList(editableData);
  }, [editableData]);

  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData('text/html', '');
  };

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    // console.log("onDragOver -> newList ===========",newList);
    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  // Not needed, just for logging purposes:
  React.useEffect(() => {
    console.log('Dragged From: ', dragAndDrop && dragAndDrop.draggedFrom);
    console.log('Dropping Into: ', dragAndDrop && dragAndDrop.draggedTo);
  }, [dragAndDrop]);

  React.useEffect(() => {
    console.log('List updated!');
  }, [list]);
  return (
    <div>
      {/* <Table columns={editColumns} pagination={false} /> */}
      <table style={{ width: '100%' }}>
        <thead
          className="ant-table-thead"
          style={{ fontSize: '13px', width: '100%' }}
        >
          <tr>
            <th
              style={{
                width: '10%',
                textAlign: 'center',
                backgroundColor: '#f1f3f6',
              }}
              className="ant-table-cell"
            >
              #
            </th>
            <th style={{ width: '20%', backgroundColor: '#f1f3f6' }}>
              CREW POSITION
            </th>
            <th style={{ width: '20%', backgroundColor: '#f1f3f6' }}>NAME</th>
            <th style={{ width: '20%', backgroundColor: '#f1f3f6' }}>
              HOURS ON DUTY
            </th>
            <th style={{ width: '20%', backgroundColor: '#f1f3f6' }}>
              HOURS TOTAL
            </th>
            <th style={{ width: '*', backgroundColor: '#f1f3f6' }}></th>
          </tr>
        </thead>
        <tbody className="ant-table-tbody">
          {editableData != '' ? (
            <>
              {list.map((item, index) => {
                return (
                  <tr
                    key={index}
                    data-position={index}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    className={
                      dragAndDrop && dragAndDrop.draggedTo === Number(index)
                        ? 'dropArea'
                        : ''
                    }
                  >
                    <td style={{ textAlign: 'center', width: '10%' }}>
                      <span>{item.key}</span>
                    </td>
                    <td>
                      <Input
                        placeholder=""
                        value={item.strCrewPosition}
                        onChange={(event) => {
                          editableData[item.key - 1].strCrewPosition =
                            event.target.value;
                          editTable(editableData);
                        }}
                      />
                    </td>
                    <td>
                      <Select
                        style={{ width: '100%', textAlign: 'left' }}
                        value={item.strName}
                        onChange={(value) => {
                          console.log('value', value);
                          editableData[item.key - 1].strName = value;
                          editableData[item.key - 1].strCrewPosition =
                            userPosition[value];
                          editTable(editableData);
                        }}
                      >
                        {userList.map((row) => {
                          return (
                            <Option key={row._id} value={row.strFullName}>
                              {row.strFullName}
                            </Option>
                          );
                        })}
                      </Select>
                    </td>
                    <td>
                      <Input
                        placeholder=""
                        value={item.strHoursOnDuty}
                        onChange={(event) => {
                          editableData[item.key - 1].strHoursOnDuty =
                            event.target.value;
                          editTable(editableData);
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder=""
                        value={item.strHoursTotal}
                        onChange={(event) => {
                          editableData[item.key - 1].strHoursTotal =
                            event.target.value;
                          editTable(editableData);
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          const newCrewList = [];
                          editableData.forEach((element, i) => {
                            if (i !== item.key - 1) {
                              newCrewList.push(element);
                            }
                          });
                          editableData = newCrewList;
                          editTable(editableData);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr class="ant-table-placeholder">
              <td colspan="6" class="ant-table-cell">
                <div class="ant-empty ant-empty-normal">
                  <div class="ant-empty-image">
                    <svg
                      class="ant-empty-img-simple"
                      width="64"
                      height="41"
                      viewBox="0 0 64 41"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        transform="translate(0 1)"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <ellipse
                          class="ant-empty-img-simple-ellipse"
                          cx="32"
                          cy="33"
                          rx="32"
                          ry="7"
                        ></ellipse>
                        <g class="ant-empty-img-simple-g" fill-rule="nonzero">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            class="ant-empty-img-simple-path"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <p
                    class="ant-empty-description"
                    data-nsfw-filter-status="swf"
                  >
                    No Data
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const WeatherTable = ({ editableData, editTable, updateValues }) => {
  const [list, setList] = React.useState([]);
  useEffect(() => {
    setList(editableData);
  }, [editableData]);

  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData('text/html', '');
  };

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    // console.log("onDragOver -> newList ===========",newList);
    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    console.log('onDrop function ========', dragAndDrop.updatedOrder);
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  // Not needed, just for logging purposes:
  React.useEffect(() => {
    console.log('Dragged From: ', dragAndDrop && dragAndDrop.draggedFrom);
    console.log('Dropping Into: ', dragAndDrop && dragAndDrop.draggedTo);
  }, [dragAndDrop]);

  React.useEffect(() => {
    console.log('List updated!');
  }, [list]);

  return (
    <div>
      {/* <Table columns={editColumns} pagination={false} /> */}
      <table style={{ width: '100%' }}>
        <thead
          className="ant-table-thead"
          style={{ fontSize: '13px', width: '100%' }}
        >
          <tr>
            <th
              style={{
                width: '20%',
                textAlign: 'center',
                backgroundColor: '#f1f3f6',
              }}
              className="ant-table-cell"
            >
              time
            </th>
            <th style={{ width: '70%', backgroundColor: '#f1f3f6' }}>
              Weather
            </th>
            <th style={{ width: '*', backgroundColor: '#f1f3f6' }}></th>
          </tr>
        </thead>
        <tbody className="ant-table-tbody">
          {editableData != '' ? (
            <>
              {list.map((item, index) => {
                return (
                  <tr
                    key={index}
                    data-position={index}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    className={
                      dragAndDrop && dragAndDrop.draggedTo === Number(index)
                        ? 'dropArea'
                        : ''
                    }
                  >
                    <td style={{ textAlign: 'center', width: '10%' }}>
                      <TimePicker
                        value={
                          item.weatherTime == null
                            ? null
                            : moment(item.weatherTime)
                        }
                        defaultValue={null}
                        onChange={(value) => {
                          editableData[item.key - 1].weatherTime = value;
                          editTable(editableData);
                        }}
                        format={'HH:mm'}
                      ></TimePicker>
                    </td>
                    <td>
                      <Textarea
                        placeholder=""
                        value={item.weather}
                        style={{ height: 'auto', width: '100%' }}
                        rows={2}
                        onChange={(event) => {
                          editableData[item.key - 1].weather =
                            event.target.value;
                          editTable(editableData);
                        }}
                      />
                    </td>

                    <td>
                      <Button
                        onClick={() => {
                          const newCrewList = [];
                          editableData.forEach((element, i) => {
                            if (i !== item.key - 1) {
                              newCrewList.push(element);
                            }
                          });
                          editableData = newCrewList;
                          editTable(editableData);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr class="ant-table-placeholder">
              <td colspan="5" class="ant-table-cell">
                <div class="ant-empty ant-empty-normal">
                  <div class="ant-empty-image">
                    <svg
                      class="ant-empty-img-simple"
                      width="64"
                      height="41"
                      viewBox="0 0 64 41"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        transform="translate(0 1)"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <ellipse
                          class="ant-empty-img-simple-ellipse"
                          cx="32"
                          cy="33"
                          rx="32"
                          ry="7"
                        ></ellipse>
                        <g class="ant-empty-img-simple-g" fill-rule="nonzero">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            class="ant-empty-img-simple-path"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <p
                    class="ant-empty-description"
                    data-nsfw-filter-status="swf"
                  >
                    No Data
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const LogEntriesTable = ({ editableData, editTable, updateValues }) => {
  // const {invoiceList} = editableData;
  const dispatch = useDispatch();
  const { codeTypes } = useSelector((state) => state.CodeType);
  const { itemTypes } = useSelector((state) => state.ItemType);
  const [intCodeTypeId, setIntCodeTypeId] = React.useState(null);

  React.useEffect(() => {
    dispatch(initCodeData());
    dispatch(initItemData());
  }, []);

  const [list, setList] = React.useState([]);
  useEffect(() => {
    setList(editableData);
  }, [editableData]);

  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData('text/html', '');
  };

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    // console.log("onDragOver -> newList ===========",newList);
    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  // Not needed, just for logging purposes:
  React.useEffect(() => {
    console.log('Dragged From: ', dragAndDrop && dragAndDrop.draggedFrom);
    console.log('Dropping Into: ', dragAndDrop && dragAndDrop.draggedTo);
  }, [dragAndDrop]);

  React.useEffect(() => {
    console.log('List updated!');
  }, [list]);

  return (
    <div>
      {/* <Table columns={editColumns} pagination={false} /> */}
      <table style={{ width: '100%' }}>
        <thead
          className="ant-table-thead"
          style={{ fontSize: '13px', width: '100%' }}
        >
          <tr>
            <th
              style={{
                width: '15%',
                textAlign: 'center',
                backgroundColor: '#f1f3f6',
              }}
              className="ant-table-cell"
            >
              TIME
            </th>
            <th style={{ width: '15%', backgroundColor: '#f1f3f6' }}>
              CODE(LETTER)
            </th>
            <th style={{ width: '15%', backgroundColor: '#f1f3f6' }}>
              ITEM(NUMBER)
            </th>
            <th style={{ width: '50%', backgroundColor: '#f1f3f6' }}>
              EXPLAINATION OF EACH ENTRY
            </th>
            <th style={{ width: '*', backgroundColor: '#f1f3f6' }}></th>
          </tr>
        </thead>
        <tbody className="ant-table-tbody">
          {editableData != '' ? (
            <>
              {list.map((item, index) => {
                return (
                  <tr
                    key={index}
                    data-position={index}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    className={
                      dragAndDrop && dragAndDrop.draggedTo === Number(index)
                        ? 'dropArea'
                        : ''
                    }
                  >
                    <td style={{ textAlign: 'center', width: '10%' }}>
                      <TimePicker
                        value={
                          item.strTime == null ? null : moment(item.strTime)
                        }
                        defaultValue={null}
                        onChange={(value) => {
                          editableData[item.key - 1].strTime = value;
                          editTable(editableData);
                        }}
                        format={'HH:mm'}
                      ></TimePicker>
                    </td>
                    <td>
                      <Select
                        style={{ width: '100%', textAlign: 'left' }}
                        value={item.strCode}
                        onChange={(value) => {
                          console.log(item.key, 'it item key');
                          editableData[item.key - 1].strCode = value;
                          editableData[item.key - 1].strItem = '';
                          setIntCodeTypeId(value);
                          editTable(editableData);
                        }}
                      >
                        {codeTypes.map((row) => {
                          return (
                            <Option key={row._id} value={row.strCode}>
                              {row.strCode}
                            </Option>
                          );
                        })}
                      </Select>
                    </td>
                    <td>
                      <Select
                        style={{ width: '100%', textAlign: 'left' }}
                        value={item.strItem}
                        onChange={(value) => {
                          editableData[item.key - 1].strItem = value;
                          editTable(editableData);
                        }}
                      >
                        {itemTypes.map((row) => {
                          if (row.intCodeTypeId.strCode == intCodeTypeId)
                            return (
                              <Option key={row._id} value={row.strItem}>
                                {row.strItem}
                              </Option>
                            );
                        })}
                      </Select>
                    </td>
                    <td>
                      <Textarea
                        placeholder=""
                        value={item.strExplanation}
                        style={{ height: 'auto', width: '100%' }}
                        rows={2}
                        onChange={(event) => {
                          editableData[item.key - 1].strExplanation =
                            event.target.value;
                          editTable(editableData);
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          const newCrewList = [];
                          editableData.forEach((element, i) => {
                            if (i !== item.key - 1) {
                              newCrewList.push(element);
                            }
                          });
                          editableData = newCrewList;
                          editTable(editableData);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr class="ant-table-placeholder">
              <td colspan="5" class="ant-table-cell">
                <div class="ant-empty ant-empty-normal">
                  <div class="ant-empty-image">
                    <svg
                      class="ant-empty-img-simple"
                      width="64"
                      height="41"
                      viewBox="0 0 64 41"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        transform="translate(0 1)"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <ellipse
                          class="ant-empty-img-simple-ellipse"
                          cx="32"
                          cy="33"
                          rx="32"
                          ry="7"
                        ></ellipse>
                        <g class="ant-empty-img-simple-g" fill-rule="nonzero">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            class="ant-empty-img-simple-path"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <p
                    class="ant-empty-description"
                    data-nsfw-filter-status="swf"
                  >
                    No Data
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export { CrewComplimentTable, LogEntriesTable, WeatherTable };
