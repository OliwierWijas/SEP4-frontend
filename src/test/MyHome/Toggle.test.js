import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Toggle from "../../components/MyHome/GraphComponent/Toggle";

describe("Toggle component", () => {
  test("Toggle changes state and text upon clicking", () => {
    const windowsStatus = false;
    const setWindowsStatus = jest.fn();
    render(<Toggle windowsStatus={windowsStatus} setWindowsStatus={setWindowsStatus}></Toggle>);

    const toggleInput = screen.getByTestId("toggleId");

    fireEvent.click(toggleInput); 

    setTimeout(() => {
      expect(screen.getByTestId("toggleId").checked).toBeTruthy();
      expect(screen.getByText("Closed")).toBeTruthy(); 
    }, 1);

    fireEvent.click(toggleInput);

    setTimeout(() => {
      expect(screen.getByTestId("toggleId").checked).toBeFalsy(); 
      expect(screen.getByText("Open")).toBeTruthy(); 
    }, 1);
  });
});
