import React, { useEffect } from 'react';
import { Col, Row, Form } from 'antd';
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
// import { DatePicker, TimePicker } from 'antd';
// import moment from "moment";
import {
    Fieldset,
    Label,
} from '../../Asset/Facility/OnlineContent.styles';
// import Button from '@iso/components/uielements/button';
// import notification from '@iso/components/Notification';
// import { useDispatch, useSelector } from 'react-redux';

const FormItem = Form.Item;

export default function (props) {
    const { data, pageState } = props;

    const [completionNotes, setCompletionNotes] = React.useState("");
    const [problem, setProblem] = React.useState("");
    const [rootCause, setRootCause] = React.useState("");
    const [solution, setSolution] = React.useState("");
    // const dispatch = useDispatch();   
    useEffect(() => {
        infoChange();
    }, [completionNotes, problem, rootCause, solution]);
    useEffect(() => {
        if (Object.keys(data).length !== 0 && pageState === "edit") {
            setCompletionNotes(data.workorder.strCompletionNotes);
            setProblem(data.workorder.strProblem);
            setRootCause(data.workorder.strRootCause);
            setSolution(data.workorder.strSolution);
        }
    }, [data]);
    const infoChange = () => {
        var info = {};
        info.strCompletionNotes = completionNotes;
        info.problem = problem;
        info.rootCause = rootCause;
        info.solution = solution;
        props.completionInf(info);
    }
    return (
        <div className="PageContent">
            <InputGroup size="large">
                <Form>
                    <Fieldset>
                        <Label>Completion Notes</Label>
                        <FormItem
                            validateStatus={completionNotes == "" ? "error" : "success"}
                            help={completionNotes == "" ? "this field is require" : ""}
                        >
                            <Textarea placeholder=""
                                style={{ height: 'auto' }}
                                rows={6}
                                name="completionNote"
                                value={completionNotes}
                                onChange={(event) => { setCompletionNotes(event.target.value); }}
                            />
                        </FormItem>
                    </Fieldset>
                </Form>
                <Form>
                    <Fieldset>
                        <Label>Problem (briefly outline the problem, if any)</Label>
                        <div style={{ position: "relative" }}>
                            <FormItem
                            // validateStatus={problem == ""? "error" : "success"}
                            // help={problem == ""? "this field is require" : ""}
                            >
                                <Input
                                    value={problem}
                                    onChange={(event) => {
                                        setProblem(event.target.value);
                                    }}
                                    placeholder=""
                                />
                            </FormItem>
                        </div>
                    </Fieldset>
                </Form>
                <Form>
                    <Fieldset>
                        <Label>Root cause (short description of the cause of issue, if any)</Label>
                        <div style={{ position: "relative" }}>
                            <FormItem
                            // validateStatus={rootCause == ""? "error" : "success"}
                            // help={rootCause == ""? "this field is require" : ""}
                            >
                                <Input
                                    value={rootCause}
                                    onChange={(event) => {
                                        setRootCause(event.target.value);
                                    }}
                                    placeholder=""
                                />
                            </FormItem>
                        </div>
                    </Fieldset>
                </Form>
                <Form>
                    <Fieldset>
                        <Label>Solution (short description of the solution, if any)</Label>
                        <div style={{ position: "relative" }}>
                            <FormItem
                            // validateStatus={solution == ""? "error" : "success"}
                            // help={solution == ""? "this field is require" : ""}
                            >
                                <Input
                                    value={solution}
                                    onChange={(event) => {
                                        setSolution(event.target.value);
                                    }}
                                    placeholder=""
                                />
                            </FormItem>
                        </div>
                    </Fieldset>
                </Form>
                {/* <Button
                    type="primary"
                    onClick={onSave}
                    className="saveBtn"
                >
                    <span>Save</span>
                </Button> */}
            </InputGroup>
        </div>
    )
}