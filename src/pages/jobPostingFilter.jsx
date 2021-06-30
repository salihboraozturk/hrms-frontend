import React, { useEffect, useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import CityService from "../services/cityService";
import WorkingTimeService from "../services/workingTimeService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import HrmsSelectOption from "../utilities/customFormControls/hrmsSelectOption";

export default function JobPostingFilter() {
  const [workingTimes, setWorkingTimes] = useState([]);
  const [cities, setCities] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let workingTimeService = new WorkingTimeService();
    workingTimeService
      .getWorkingTime()
      .then((result) => setWorkingTimes(result.data.data));
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);
  const initialValues = {
    cityId: "",
    workingTimeId: "",
  };
  const paginationInitialValues = {
    pageNo: 1,
    pageSize: "",
  };
  const schema = Yup.object({
    cityId: Yup.number(),
    workingTimeId: Yup.number(),
  });
  const paginationSchema = Yup.object({
    pageNo: Yup.number(),
    pageSize: Yup.number().required("Sayfa Büyüklüğü Girmek Zorunludur"),
  });
  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id,
  }));

  const workingTimeOptions = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.workingTimeName,
    value: workingTime.id,
  }));

  function handleFilter(values) {
    if (values.cityId && values.workingTimeId) {
      history.push(
        `/jobposting/cityId/${values.cityId}/workingTimeId/${values.workingTimeId}`
      );
      window.location.reload(true);
    } else if (values.cityId) {
      history.push(`/jobposting/cityId/${values.cityId}`);
      window.location.reload(true);
    } else if (values.workingTimeId) {
      history.push(`/jobposting/workingTimeId/${values.workingTimeId}`);
      window.location.reload(true);
    }
  }

  function handlePagination(values) {
    history.push(
      `/jobposting/getallbypage/pageNo/${values.pageNo}/pageSize/${values.pageSize}`
    );
    window.location.reload(true);
  }
  const paginationOptions = [
    { key: 1, text: 5, value: 5 },
    { key: 2, text: 10, value: 10 },
    { key: 3, text: 20, value: 20 },
    { key: 4, text: 50, value: 50 },
    { key: 5, text: 100, value: 100 },
    { key: 6, text: 1, value: 1 },
  ];
  return (
    <Menu vertical>
      <Menu.Item style={{ textAlign: "left", paddingLeft: "20px" }}>
        Home
        <Menu.Menu style={{ textAlign: "left" }}>
          <Menu.Item name="search">Search</Menu.Item>
          <Menu.Item name="add">Add</Menu.Item>
          <Menu.Item name="about">Remove</Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item style={{ textAlign: "center", minHeight: "170px" }}>
        <Menu.Menu>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => {
              handleFilter(values);
            }}
          >
            <Form>
              <div
                style={{
                  padding: "0px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <h5 style={{ paddingTop: "10px" }}>Filter</h5>
                <Button
                  circular
                  type="submit"
                  style={{}}
                  icon="search"
                />
              </div>

              <HrmsSelectOption
                placeholder="Şehir seçin"
                name="cityId"
                options={cityOptions}
                className="hrmsSelectOption"
              />

              <HrmsSelectOption
                placeholder="Çalışma Türü Seçin"
                name="workingTimeId"
                options={workingTimeOptions}
                className="hrmsSelectOption"
              />
            </Form>
          </Formik>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item style={{ textAlign: "center", minHeight: "140px" }}>
        <Menu.Menu>
          <Formik
            initialValues={paginationInitialValues}
            validationSchema={paginationSchema}
            onSubmit={(values) => {
              handlePagination(values);
            }}
          >
            <Form>
              <div
                style={{
                  padding: "0px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <h5 style={{ paddingTop: "10px" }}>Pagination</h5>
                <Button
                  circular
                  icon="check"
                  style={{ float: "right" }}
                  type="submit"
                />
              </div>

              <HrmsSelectOption
                options={paginationOptions}
                placeholder="Sayfa Büyüklüğü Seçiniz"
                name="pageSize"
                className="hrmsSelectOption"
              />
            </Form>
          </Formik>
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
}
