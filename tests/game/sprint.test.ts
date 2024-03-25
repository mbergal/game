import { expect, test } from "vitest"

import _ from "lodash"
import * as Plan from "../../game/plan"

test("generatePlan", () => {
    const plan = Plan.generatePlan(0)
    const a = _.chain(plan)
        .entries()
        .map(([key, value]) => [key.toString().padStart(4), value] as const)
        .sortBy((x) => parseInt(x[0]))
        .fromPairs()
        .value()
    expect(a).toMatchSnapshot()
})
