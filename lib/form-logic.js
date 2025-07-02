// lib/form-logic.js

/**
 * Evalúa una regla de condición 'showWhen' contra los valores actuales del formulario.
 * @param {object} condition - El objeto de condición (ej: { field: 'person_type', is: ['fisica'] }).
 * @param {object} formValues - El objeto con los valores actuales del formulario.
 * @returns {boolean} - Devuelve true si la condición se cumple, de lo contrario false.
 */
export const evaluateCondition = (condition, formValues) => {
  if (!condition) {
    return true; // Si no hay condición, siempre es visible.
  }

  // Evalúa la condición principal
  const mainField = condition.field;
  const mainValue = formValues[mainField];
  const mainConditionMet = condition.is ? condition.is.includes(mainValue) : !!mainValue;

  // Si no hay condición 'and', devolvemos el resultado de la principal
  if (!condition.and) {
    return mainConditionMet;
  }

  // Si la condición principal no se cumple, no hace falta evaluar la 'and'
  if (!mainConditionMet) {
    return false;
  }

  // Evalúa la condición 'and' anidada
  const andField = condition.and.field;
  const andValue = formValues[andField];
  const andConditionMet = condition.and.is ? condition.and.is.includes(andValue) : !!andValue;

  // Devuelve true solo si ambas condiciones se cumplen
  return mainConditionMet && andConditionMet;
};