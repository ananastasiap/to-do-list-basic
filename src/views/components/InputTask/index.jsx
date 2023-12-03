import React, { useLayoutEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

export const InputTask = ({ title, id, onDone, onRemove, onEdited }) => {
  const [checked, setChecked] = useState(false);
  const [valueForEdit, setValueForEdit] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);
  const editTitleInputRef = useRef(null);

  useLayoutEffect(() => {
    if (isEditMode && editTitleInputRef) {
      editTitleInputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          className={styles.inputTaskCheckbox}
          checked={checked}
          onChange={(event) => {
            setChecked(event.target.checked);
            setTimeout(() => {
              onDone(id);
            }, 300);
          }}
        />
        {isEditMode ? (
          <input
            className={styles.inputTaskTitleEdit}
            value={valueForEdit}
            onChange={(event) => setValueForEdit(event.target.value)}
            ref={editTitleInputRef}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          onClick={() => {
            onEdited(id, valueForEdit);
            setIsEditMode(false);
          }}
          aria-label="Save"
          className={styles.inputTaskSave}
        />
      ) : (
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
          aria-label="Edit"
          className={styles.inputTaskEdit}
        />
      )}
      <button
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemove(id);
          }
        }}
        aria-label="Remove"
        className={styles.inputTaskRemove}
      />
    </div>
  );
};

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>


*/
