import React from "react";
import { useNavigate } from "react-router-dom";

function CardForm({ formData, handleChange, handleSubmit, cancelPath, formTitle }) {
    const navigate = useNavigate();

    return (
        <div className="container">
          <h2>{formTitle}</h2>
    
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="front" className="form-label">Front</label>
              <textarea
                id="front"
                name="front"
                className="form-control"
                value={formData.front}
                onChange={handleChange}
                placeholder="Front side of card"
              />
            </div>
    
            <div className="mb-3">
              <label htmlFor="back" className="form-label">Back</label>
              <textarea
                id="back"
                name="back"
                className="form-control"
                value={formData.back}
                onChange={handleChange}
                placeholder="Back side of card"
              />
            </div>
    
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => navigate(cancelPath)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      );
    }
    
    export default CardForm;