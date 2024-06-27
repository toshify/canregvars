import { useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./i18n";

type SortType = {
  target: SortTarget;
  direction: number;
};
type SortTarget = (typeof SortTargets)[number];
const SortTargets = [
  "name",
  "category",
  "dataType",
  "registrationMethod",
  "status",
  "variableType",
  "informationLevel",
  "validFrom",
  "createdOn",
  "dataSize",
  "validForExtraction",
] as const;

function App() {
  const CRV_API_BASE = "https://metadata.kreftregisteret.no/rest/v1/variables/";

  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [variables, setVariables] = useState([]);
  const [langSuffix, setLangSuffix] = useState(
    i18n.language === "en" ? "En" : ""
  );
  const [sort, setSort] = useState({
    target: "name",
    direction: -1,
  } as SortType);
  const [error, setError] = useState(Error);

  // console.log("Currently selected language:", i18n.language);
  // console.log("Browser-requested languages:", i18n.languages);

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        setVariables([]);
        setIsLoading(true);
        const response = await fetch(`${CRV_API_BASE}:filtered`);
        const result = await response.json();
        setVariables(result?.variableList);
      } catch (error) {
        setError(error as Error);
        console.error("Not able to GET data from API:\n", error);
      } finally {
        setIsLoading(false);
        // setIsLoading(true);
      }
    };

    fetchVariables();
  }, []);

  const loading = isLoading && (
    <tr>
      <td colSpan={5} className="text-secondary">
        <Spinner className="align-middle me-2" animation="border" role="status">
          <span className="visually-hidden">{t("loading")}</span>
        </Spinner>
        <span>{t("fetching")}</span>
      </td>
    </tr>
  );

  const memoizedVariables = useMemo(
    () =>
      variables.sort((a, b) => {
        switch (sort.target) {
          case "name":
            return (
              (a["name" + langSuffix] < b["name" + langSuffix] ? 1 : -1) *
              sort.direction
            );
          case "category":
            return (
              (a.category["name" + langSuffix] < b.category["name" + langSuffix]
                ? 1
                : -1) * sort.direction
            );
          case "dataType":
            return (
              (a.dataType["name" + langSuffix] < b.dataType["name" + langSuffix]
                ? 1
                : -1) * sort.direction
            );
          case "registrationMethod":
            return (
              (a.registrationMethod["name" + langSuffix] <
              b.registrationMethod["name" + langSuffix]
                ? 1
                : -1) * sort.direction
            );
          case "status":
            return (
              (a.status["name" + langSuffix] < b.status["name" + langSuffix]
                ? 1
                : -1) * sort.direction
            );
          case "variableType":
            return (
              (a.variableType["name" + langSuffix] <
              b.variableType["name" + langSuffix]
                ? 1
                : -1) * sort.direction
            );
          case "informationLevel":
            return (
              (a.informationLevel["name" + langSuffix] <
              b.informationLevel["name" + langSuffix]
                ? 1
                : -1) * sort.direction
            );
          case "validFrom":
            return (
              (new Date(a.validFrom) < new Date(b.validFrom) ? 1 : -1) *
              sort.direction
            );
          case "createdOn":
            return (
              (new Date(a.createdOn) < new Date(b.createdOn) ? 1 : -1) *
              sort.direction
            );
          case "dataSize":
            return (a.dataSize < b.dataSize ? 1 : -1) * sort.direction;
          case "validForExtraction":
            return (
              (a.validForExtraction < b.validForExtraction ? 1 : -1) *
              sort.direction
            );
        }
      }),
    [variables, sort, langSuffix]
  );

  const columnHeader = (name: SortTarget) => {
    return (
      <th onClick={() => setSort(getNewSort(name, sort))}>
        {t(name as string)}
        {sort.target === name && (sort.direction > 0 ? "▼" : "▲")}
      </th>
    );
  };

  const tableRow =
    memoizedVariables &&
    (memoizedVariables as []).map((baseEntry) => {
      return (
        <tr key={`id=${baseEntry.id}`}>
          <td key={`name&desc4id=${baseEntry.id}`}>
            <Card>
              <CardHeader key={`name4id=${baseEntry.id}`}>
                {baseEntry["name" + langSuffix]}
              </CardHeader>
              <CardBody key={`desc4id=${baseEntry.id}`}>
                <p>{baseEntry["description" + langSuffix]}</p>
                <p className="text-body-tertiary mt-4">
                  {t("techName")}: {baseEntry.techName}
                </p>
              </CardBody>
            </Card>
          </td>
          <td key={`category.id=${baseEntry.category.id}`}>
            <Card>
              <CardHeader key={`name4id=${baseEntry.category.id}`}>
                {baseEntry.category["name" + langSuffix]}
              </CardHeader>
              <CardBody key={`desc4id=${baseEntry.category.id}`}>
                <p>{baseEntry.category["description" + langSuffix]}</p>
                <p className="text-body-tertiary mt-4">
                  {t("sorting")}: {baseEntry.category.sortering}
                </p>
                <p className="text-body-tertiary">
                  {baseEntry.category.parent
                    ? `${t("parent")}: ${
                        baseEntry.category.parent["name" + langSuffix]
                      }`
                    : ""}
                  <br />
                  {baseEntry.category.parent
                    ? `${baseEntry.category.parent["description" + langSuffix]}`
                    : ""}
                </p>
              </CardBody>
            </Card>
          </td>
          <td key={`dataType.id=${baseEntry.dataType.id}`}>
            <Card>
              <CardHeader key={`name4id=${baseEntry.dataType.id}`}>
                {baseEntry.dataType["name" + langSuffix]}
              </CardHeader>
              <CardBody key={`desc4id=${baseEntry.dataType.id}`}>
                <p>{baseEntry.dataType["description" + langSuffix]}</p>
                <p className="text-body-tertiary mt-4">
                  {baseEntry.dataType.parent
                    ? `${t("sorting")}: ${baseEntry.dataType.parent.sortering}`
                    : ""}
                </p>
              </CardBody>
            </Card>
          </td>
          <td key={`registrationMethod.id=${baseEntry.registrationMethod.id}`}>
            <Card>
              <CardHeader key={`name4id=${baseEntry.registrationMethod.id}`}>
                {baseEntry.registrationMethod["name" + langSuffix]}
              </CardHeader>
              <CardBody key={`desc4id=${baseEntry.registrationMethod.id}`}>
                <p>
                  {baseEntry.registrationMethod["description" + langSuffix]}
                </p>
                <p className="text-body-tertiary mt-4">
                  {t("mappedName")}:{" "}
                  {JSON.parse(baseEntry.registrationMethod.mappedName).name}
                </p>
                <p className="text-body-tertiary mt-4">
                  {baseEntry.registrationMethod
                    ? `${t("sorting")}: ${
                        baseEntry.registrationMethod.sortering
                      }`
                    : ""}
                </p>
              </CardBody>
            </Card>
          </td>
          <td key={`status.id=${baseEntry.status.id}`}>
            <Card>
              <CardHeader key={`name4id=${baseEntry.status.id}`}>
                {baseEntry.status["name" + langSuffix]}
              </CardHeader>
              <CardBody key={`desc4id=${baseEntry.status.id}`}>
                <p>{baseEntry.status["description" + langSuffix]}</p>
              </CardBody>
            </Card>
          </td>
          <td key={`variableType.id=${baseEntry.variableType.id}`}>
            <Card>
              <CardHeader key={`name4id=${baseEntry.variableType.id}`}>
                {baseEntry.variableType["name" + langSuffix]}
              </CardHeader>
              <CardBody key={`desc4id=${baseEntry.variableType.id}`}>
                <p>{baseEntry.variableType["description" + langSuffix]}</p>
              </CardBody>
            </Card>
          </td>
          <td key={`informationLevel.id=${baseEntry.informationLevel.id}`}>
            <Card>
              <CardHeader key={`name4id=${baseEntry.informationLevel.id}`}>
                {baseEntry.informationLevel["name" + langSuffix]}
              </CardHeader>
              <CardBody key={`desc4id=${baseEntry.informationLevel.id}`}>
                <p className="text-body-tertiary mt-4">
                  {baseEntry.informationLevel.shortName
                    ? `${t("shortName")}: ${
                        baseEntry.informationLevel.shortName
                      }`
                    : ""}
                </p>
                <p className="text-body-tertiary">
                  {baseEntry.informationLevel.sortering
                    ? `${t("sorting")}: ${baseEntry.informationLevel.sortering}`
                    : ""}
                </p>
              </CardBody>
            </Card>
          </td>
          <td key={`valdiFrom4id=${baseEntry.id}`}>
            <p key={`validFrom4id=${baseEntry.id}`}>{baseEntry.validFrom}</p>
          </td>
          <td key={`createdOn4id=${baseEntry.id}`}>
            <p key={`createdOn4id=${baseEntry.id}`}>{baseEntry.createdOn}</p>
          </td>
          <td key={`dataSize4id=${baseEntry.id}`}>
            <p key={`dataSize4id=${baseEntry.id}`}>{baseEntry.dataSize}</p>
          </td>
          <td key={`validForExtraction4id=${baseEntry.id}`}>
            <p key={`validForExtraction4id=${baseEntry.id}`}>
              {baseEntry.validForExtraction}
            </p>
          </td>
        </tr>
      );
    });

  const getNewSort = (target: SortTarget, oldSorting: SortType) => {
    if (target === oldSorting.target) {
      return {
        target,
        direction: oldSorting.direction * -1,
      };
    } else {
      return { target, direction: -1 };
    }
  };

  const saveToFile = (jsonData) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${t("defaultFileName")}.json`;
    element.click();
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>{t("title")}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => saveToFile(memoizedVariables)}>
            {t("export")}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover responsive>
            <thead>
              <tr>
                {columnHeader("name")}
                {columnHeader("category")}
                {columnHeader("dataType")}
                {columnHeader("registrationMethod")}
                {columnHeader("status")}
                {columnHeader("variableType")}
                {columnHeader("informationLevel")}
                {columnHeader("validFrom")}
                {columnHeader("createdOn")}
                {columnHeader("dataSize")}
                {columnHeader("validForExtraction")}
              </tr>
            </thead>
            <tbody>
              {loading}
              {tableRow}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
