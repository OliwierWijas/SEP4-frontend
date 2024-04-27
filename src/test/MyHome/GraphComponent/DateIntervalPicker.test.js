import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"
import DateIntervalPicker from "../../../components/MyHome/GraphComponent/DateIntervalPicker"

describe('DateIntervalPicker component', () => {
    it('renders without crashing', () => {
        render(<DateIntervalPicker interval={[{ startDate: new Date(), endDate: new Date() }]} />);
    })
})