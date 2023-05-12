import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddWorkOrder from './AddWorkOrder';
import EditWorkOrder from './EditWorkOrder';
import Actions from '../../redux/workorder/actions';
// const { initData, selectCurrentInvoice, toggleView } = invoiceActions;
const { initData } = Actions;
export default function SingleWorkOrder() {
  const dispatch = useDispatch();
  const workorders = useSelector((state) => state.Workorders); 
  // const dispatch = useDispatch();
  // const match = useRouteMatch();
  const { id } = useParams();
  // const { initialUsers, currentInvoice } = users;

  const [addWorkorderId, setAddWorkorderId] = React.useState();

  useEffect(() => {
    dispatch(initData());
  }, []);

  useEffect(() => {
    let addWorkorderId = workorders.workorders[workorders.workorders.length - 1]
      ? workorders.workorders[workorders.workorders.length - 1]._id + 1
      : 0;
    setAddWorkorderId(addWorkorderId);
  }, [workorders]);

  const redirectPath = '/dashboard/workorder';
  if (id) {
    return (
      <EditWorkOrder
        {...workorders}
        selectedId={id}
        redirectPath={redirectPath}
      />
    );
  }
  return (
    <AddWorkOrder
      {...workorders}
      addWorkorderId={addWorkorderId}
      redirectPath={redirectPath}
    />
  );
}
