export function validate(formData) {
  return (
    formData.name.trim() !== "" &&
    formData.hp.trim() !== "" &&
    formData.atk.trim() !== "" &&
    formData.spAtk.trim() !== "" &&
    formData.def.trim() !== "" &&
    formData.spDef.trim() !== "" &&
    formData.spd.trim() !== "" &&
    formData.height.trim() !== "" &&
    formData.weight.trim() !== "" &&
    formData.type1.trim() !== ""
  );
}
