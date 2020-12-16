import React from "react"
import Selection from "../selection/Selection"
import { shallow } from "enzyme"
describe("<Selection />", () => {
    it("it should create and match Snapshot when shallow rendered", () => {
        const updateDinerSelections = jest.fn()
        const wrapper = shallow(<Selection updateDinerSelections={updateDinerSelections} />)
        expect(wrapper).toMatchSnapshot();
    })
});