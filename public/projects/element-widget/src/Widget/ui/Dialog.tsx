import { Observer, observer } from "mobx-react-lite";
import { useUIStore } from "../UIStoreContext";

import s from "./Dialog.module.css";
import { FixedSizeList } from "react-window";
import { ClosableElement } from "./ClosableElement";
import { ActionButton } from "./ActionButton";
import { CloseButton } from "./CloseButton";
import { runInAction } from "mobx";

export const Dialog = observer(() => {
  const store = useUIStore();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const min = parseInt(event.target.value, 10);

    runInAction(() => {
      store.min = min;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      store.query = event.target.value;
    });
  };

  return (
    <div className={s.container}>
      <div className={s.close}>
        <CloseButton
          onClick={() => {
            store.closeDialog();
          }}
        />
      </div>
      <h4 className={s.header}>Select items</h4>
      <div className={s.filters}>
        <div className={s.filter}>
          <label htmlFor="name-filter">Search</label>
          <input
            className={s.textInput}
            type="text"
            id="name-filter"
            onChange={handleInputChange}
          />
        </div>
        <div className={s.filter}>
          <label htmlFor="amount-filter">Filter</label>
          <select
            className={s.select}
            id="amount-filter"
            value={store.min}
            onChange={handleSelectChange}
          >
            <option value="0">No filter</option>
            <option value="10">{">"}10</option>
            <option value="50">{">"}50</option>
            <option value="100">{">"}100</option>
          </select>
        </div>
      </div>
      <div className={s.list}>
        <FixedSizeList
          height={246}
          width={430}
          itemCount={store.visibleItems.length}
          itemSize={27}
          itemData={store.visibleItems}
          innerElementType="ul"
        >
          {({ index, style, data }) => (
            <Observer>
              {/* subscribe on modifications of the array from the store */}
              {() => {
                const id = data[index]!;
                const disabled =
                  store.checkedIdsSet.size >= 3 && !store.checkedIdsSet.has(id);
                return (
                  <li
                    className={`${s.listItem} ${disabled ? s.notAllowed : ""}`}
                    style={style}
                  >
                    <input
                      id={`list-item-${id}`}
                      type="checkbox"
                      checked={store.checkedIdsSet.has(id)}
                      disabled={disabled}
                      onChange={() => {
                        store.toggleItemInList(id);
                      }}
                    />
                    <label htmlFor={`list-item-${id}`}>{id}</label>
                  </li>
                );
              }}
            </Observer>
          )}
        </FixedSizeList>
      </div>
      <div className={s.selectedItemsDescription}>Current selected items</div>
      <div className={s.selectedItems}>
        {Array.from(store.checkedIdsSet).map((id) => (
          <ClosableElement
            text={id}
            key={id}
            onClick={() => {
              store.toggleItemInList(id);
            }}
          />
        ))}
      </div>
      <div className={s.actions}>
        <ActionButton
          text="Save"
          variant="green"
          onClick={() => {
            store.save();
          }}
        />
        <ActionButton
          text="Cancel"
          variant="red"
          onClick={() => {
            store.cancel();
          }}
        />
      </div>
    </div>
  );
});

Dialog.displayName = "Dialog";
