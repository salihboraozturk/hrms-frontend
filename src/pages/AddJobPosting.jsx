import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Form,
  Grid,
  Card,
  Input,
  Label,
  Button,
  Dropdown,
} from "semantic-ui-react";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import EmployerService from "../services/employerService";
import JobTypeService from "../services/jobTypeService";
import WorkingTimeService from "../services/workingTimeService";
import JobPostingService from "../services/jobPostingService";
import { useFormik } from "formik";

export default function AddJobPosting() {
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  useEffect(() => {
    let workingTimeService = new WorkingTimeService();
    workingTimeService
      .getWorkingTime()
      .then((result) => setWorkingTimes(result.data.data));
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPosition()
      .then((result) => setJobPositions(result.data.data));
    let employerService = new EmployerService();
    employerService
      .getEmployers()
      .then((result) => setEmployers(result.data.data));
    let jobTypeService = new JobTypeService();
    jobTypeService.getJobType().then((result) => setJobTypes(result.data.data));
  }, []);
  const ValidationSchema = Yup.object({
    employerId: Yup.number().required("Zorunlu Alan"),
    jobPositionId: Yup.number().required("Zorunlu Alan"),
    cityId: Yup.number().required("Zorunlu Alan"),
    jobDescription: Yup.string()
      .max(50, "Açıklama En fazla 50 karakter olabilir")
      .required("Zorunlu Alan"),
    jobTypeId: Yup.number().required("Zorunlu Alan"),
    minSalary: Yup.number()
      .min(0, "Maaş 0'dan düşük olamaz")
      .required("Zorunlu Alan"),
    maxSalary: Yup.number()
      .min(0, "Max Maaş 0'dan düşük olamaz")
      .required("Zorunlu Alan"),
    numberOfOpenPosition: Yup.number()
      .min(1, "Aranan Eleman sayısı en düşük 0 olabilir")
      .required("Zorunlu Alan"),
    workingTimeId: Yup.number().required("Zorunlu Alan"),
  });

  const formik = useFormik({
    initialValues: {
      employerId: "",
      jobPositionId: "",
      cityId: "",
      jobDescription: "",
      jobTypeId: "",
      minSalary: "",
      maxSalary: "",
      numberOfOpenPosition: "",
      workingTimeId: "",
      deadlineDate: "",
    },
    ValidationSchema,
    onSubmit: (values, { resetForm }) => {
      let jobPostingService = new JobPostingService();

      jobPostingService
        .addJobPosting(values);
      resetForm({});
    },
  });

  const cityOptions = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id,
  }));

  const employerOptions = employers.map((employer, index) => ({
    key: index,
    text: employer.companyName,
    value: employer.id,
  }));

  const jobPositionOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.positionName,
    value: jobPosition.positionId,
  }));

  const jobTypeOptions = jobTypes.map((jobType, index) => ({
    key: index,
    text: jobType.jobTypeName,
    value: jobType.id,
  }));

  const workingTimeOptions = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.workingTimeName,
    value: workingTime.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"-45em"}}>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Group>
          <Card>
            <Card.Content>
              <Card.Header>İş İlanı Ekle</Card.Header>
              <Card.Meta>Şirket Adı</Card.Meta>

              <Card.Description>
                <Form.Field>
                  <Dropdown
                    clearable
                    item
                    placeholder="İşveren Seçin"
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "employerId")
                    }
                    onBlur={formik.onBlur}
                    id="id"
                    value={formik.values.employerId}
                    options={employerOptions}
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown
                    clearable
                    item
                    placeholder="İş Pozisyonu Seçin"
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "jobPositionId")
                    }
                    onBlur={formik.onBlur}
                    id="id"
                    value={formik.values.jobPositionId}
                    options={jobPositionOptions}
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown
                    clearable
                    item
                    placeholder="Şehir Seçin"
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "cityId")
                    }
                    onBlur={formik.onBlur}
                    id="id"
                    value={formik.values.cityId}
                    options={cityOptions}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    type="text"
                    placeholder="İş açıklaması"
                    value={formik.values.jobDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    name="jobDescription"
                  ></Input>
                </Form.Field>

                <Form.Field>
                  <Dropdown
                    clearable
                    item
                    placeholder="İş Tipi Seçin"
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "jobTypeId")
                    }
                    onBlur={formik.onBlur}
                    id="id"
                    value={formik.values.jobTypeId}
                    options={jobTypeOptions}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    type="number"
                    labelPosition="right"
                    placeholder="Min Salary"
                    value={formik.values.minSalary}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    name="minSalary"
                  >
                    <input />
                    <Label>₺</Label>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <Input
                    type="number"
                    labelPosition="right"
                    placeholder="Maximum Maaş"
                    value={formik.values.maxSalary}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    name="maxSalary"
                  >
                    <input />
                    <Label>₺</Label>
                  </Input>
                </Form.Field>

                <Form.Field>
                  <Input
                    type="number"
                    placeholder="Açık Pozisyon Sayısı"
                    value={formik.values.numberOfOpenPosition}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    name="numberOfOpenPosition"
                  ></Input>
                </Form.Field>

                <Form.Field>
                  <Dropdown
                    clearable
                    item
                    placeholder="İş Zamanı Seçin"
                    selection
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "workingTimeId")
                    }
                    onBlur={formik.onBlur}
                    id="id"
                    value={formik.values.workingTimeId}
                    options={workingTimeOptions}
                  />
                </Form.Field>

                <Form.Field>
                  <label>İlan Kapanış Tarihi</label>
                  <Input
                    type="date"
                    placeholder="Deadline Date"
                    value={formik.values.deadlineDate}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    name="deadlineDate"
                  ></Input>
                </Form.Field>
              </Card.Description>
            </Card.Content>
            <Button
              content="İlan Ekle"
              labelPosition="right"
              icon="add"
              primary
              type="submit"
            />
          </Card>
        </Card.Group>
      </Form>
    </div>
  );
}
