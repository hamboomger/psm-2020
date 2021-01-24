import React, {createContext, useContext, useState} from "react";

interface UpdateCellFunction {
  (coords: string, val: boolean): void
}

interface SetActiveCellsFunction {
  (newCells: Set<string>): void
}

const AppContext = createContext(new Set<string>());
const SetActiveCellsContext = createContext<SetActiveCellsFunction>(() => { });
const UpdateCellContext = createContext<UpdateCellFunction>(() => { });

export function useActiveCells(): Set<string> {
  return useContext(AppContext);
}

export function useUpdateCell(): UpdateCellFunction {
  return useContext(UpdateCellContext);
}

export function useSetActiveCells(): SetActiveCellsFunction {
  return useContext(SetActiveCellsContext);
}

export function ContextProvider({children}: any) {
  const [activeCells, setActiveCells] = useState(new Set<string>())

  function updateCell(coords: string, val: boolean) {
    const newSet = new Set(activeCells);
    if (val) {
      newSet.add(coords);
    } else {
      newSet.delete(coords);
    }
    setActiveCells(newSet);
  }

  function updateActiveCells(newSet: Set<string>) {
    setActiveCells(newSet);
  }

  return (
    <AppContext.Provider value={activeCells}>
      <SetActiveCellsContext.Provider value={updateActiveCells}>
        <UpdateCellContext.Provider value={updateCell}>
          {children}
        </UpdateCellContext.Provider>
      </SetActiveCellsContext.Provider>
    </AppContext.Provider>
  )
}
