import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import SummaryCard from "./SummaryCard"

describe("SummaryCard", () => {

  it("renders the title correctly", () => {
    render(<SummaryCard title="Balance" amount={1000} />)
    expect(screen.getByText("Balance")).toBeInTheDocument()
  })

  it("renders formatted amount", () => {
    render(<SummaryCard title="Income" amount={5000} />)
    expect(screen.getByText("$5,000.00")).toBeInTheDocument()
  })

  it("applies custom color when provided", () => {
    render(
      <SummaryCard 
        title="Expenses" 
        amount={2000} 
        color="#ef4444" 
      />
    )
    expect(screen.getByText("Expenses")).toBeInTheDocument()
  })

})