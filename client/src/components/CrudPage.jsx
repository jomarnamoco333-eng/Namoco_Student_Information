import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Table,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { MdEdit, MdDelete, MdSearch } from "react-icons/md";
import api from "../api/axiosConfig";

const CrudPage = ({ title, endpoint, idField, fields, searchFields }) => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const emptyForm = () =>
    Object.fromEntries(fields.map((field) => [field.name, ""]));

  const fetchRecords = async () => {
    try {
      setError("");
      const response = await api.get(`/${endpoint}`);
      setRecords(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load records. Check your server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [endpoint]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm());
    setShow(true);
  };

  const openEditModal = (record) => {
    setEditingId(record[idField]);

    const values = {};
    fields.forEach((field) => {
      const value = record[field.name] ?? "";

      // Convert database date values into YYYY-MM-DD for date inputs.
      values[field.name] =
        field.type === "date" && value
          ? String(value).slice(0, 10)
          : String(value);
    });

    setFormData(values);
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId !== null) {
        await api.put(`/${endpoint}/${editingId}`, formData);
        alert(`${title} updated successfully!`);
      } else {
        await api.post(`/${endpoint}/new`, formData);
        alert(`${title} added successfully!`);
      }

      setShow(false);
      setFormData(emptyForm());
      setEditingId(null);

      await fetchRecords();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Failed to save ${title}.`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${title.toLowerCase()}?`,
    );

    if (!confirmed) return;

    try {
      await api.delete(`/${endpoint}/${id}`);
      alert(`${title} deleted successfully!`);
      await fetchRecords();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || `Failed to delete ${title}.`);
    }
  };

  const filteredRecords = records.filter((record) =>
    searchFields.some((field) =>
      String(record[field] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );

  return (
    <>
      <Container className="mt-4">
        <h3>{title} Management</h3>
        <p>Manage your {title.toLowerCase()} records here.</p>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Row className="mt-3 g-2">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <MdSearch />
              </InputGroup.Text>

              <Form.Control
                type="search"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col md={{ span: 4, offset: 4 }}>
            <div className="d-grid">
              <Button variant="success" onClick={openAddModal}>
                Add New {title}
              </Button>
            </div>
          </Col>
        </Row>

        <div className="mt-4">
          {loading ? (
            <p>Loading {title.toLowerCase()}...</p>
          ) : (
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  {fields.map((field) => (
                    <th key={field.name}>{field.label}</th>
                  ))}

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record[idField]}>
                    {fields.map((field) => (
                      <td key={field.name}>
                        {field.name === "teacher_id"
                          ? record.Teacher
                            ? `${record.Teacher.first_name} ${record.Teacher.last_name}`
                            : "Unknown Teacher"
                          : field.type === "date" && record[field.name]
                            ? new Date(record[field.name]).toLocaleDateString()
                            : record[field.name]}
                      </td>
                    ))}

                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => openEditModal(record)}
                          title="Edit"
                        >
                          <MdEdit />
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(record[idField])}
                          title="Delete"
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={fields.length + 1} className="text-center">
                      No {title.toLowerCase()} records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </Container>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId !== null ? "Edit" : "Add New"} {title}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            {fields.map((field) => (
              <Form.Group className="mb-3" key={field.name}>
                <Form.Label>{field.label}</Form.Label>

                <Form.Control
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  required
                  min={field.type === "number" ? 1 : undefined}
                  step={field.type === "number" ? 1 : undefined}
                />
              </Form.Group>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShow(false)}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button variant="success" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId !== null ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CrudPage;
