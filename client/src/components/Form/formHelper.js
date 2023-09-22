import React, { useState } from "react";

export function FormField({ label, name, value, onChange, onBlur, required }) {
  const [error, setError] = useState(false);

  const handleBlur = (event) => {
    const { value } = event.target;
    if (required && value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div>
      <label className="formLabel">{label}:</label>
      <input
        className={`formInput ${error ? "error" : ""}`}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        placeholder={error && required ? "Campo obligatorio" : ""}
      />
      {/* {error && <p className="errorText">Campo obligatorio</p>} */}
    </div>
  );
}

export function validate(formData) {
  const imagePattern = /\.(png|jpg|jpeg|gif)$/i; // Expresión regular para extensiones de imagen
  return (
    formData.name.trim() !== "" &&
    !isNaN(formData.hp) &&
    !isNaN(formData.atk) &&
    !isNaN(formData.spAtk) &&
    !isNaN(formData.def) &&
    !isNaN(formData.spDef) &&
    !isNaN(formData.spd) &&
    !isNaN(formData.height) &&
    !isNaN(formData.weight) &&
    formData.type1.trim() !== "" &&
    (formData.sprite.trim() === "" || imagePattern.test(formData.sprite))
  );
}
