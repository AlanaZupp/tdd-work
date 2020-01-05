import { add } from "./stringCalculator";

describe("calculator",()=>{
    it("should return 0 when given an empty string",()=>{
        const result=add('');
        expect(result).toBe(0);
    });
    it.each`
        input | expected
        ${"7"}|${7}
        ${"10"}|${10}
        ${"4"}|${4}
        ${"1,2"}|${3}
        ${"2,4"}|${6}
        ${"2,4,1,1,1,1"}|${10}
        ${"2,4,1,1,1"}|${9}
        ${"2,4,1,1"}|${8}
    `("should return the sum $expected when given the string '$input'",({input,expected})=>{
        const result=add(input);
        expect(result).toBe(expected);
    });
    it.each`
        input | expected
        ${"7\n3"}|${10}
        ${"2\n1\n3"}|${6}
    `("should handle new line characters and return the sum $expected when given the string '$input'",({input,expected})=>{
        const result=add(input);
        expect(result).toBe(expected);
    })
    it.each`
        input | expected
        ${"//;\n1;2"}|${3}
        ${"//|\n1|2|3"}|${6}
        ${"//'\n1'2'1"}|${4}
    `("should be able to change the delimitor and return the sum $expected when given the string '$input'",({input,expected})=>{
        const result=add(input);
        expect(result).toBe(expected);
    })
    it.each`
        input | expected
        ${"//;\n1;-2"}|${"negatives not allowed -2"}
        ${"//|\n-1|2|3"}|${"negatives not allowed -1"}
        ${"//'\n1'-2'-1"}|${"negatives not allowed -2 -1"}
    `("should be able to check for negative numbers and return the error $expected when given the string '$input'",({input,expected})=>{
    const result=add(input);
    expect(result).toBe(expected);
    })
    it.each`
    input | expected
    ${"//;\n1001;2"}|${2}
    ${"//|\n1|2|3000"}|${3}
    ${"//'\n1'21231'1"}|${2}
    `("should ignore numbers greater than 1000 and return the sum $expected when given the string '$input'",({input,expected})=>{
    const result=add(input);
    expect(result).toBe(expected);
    })
    it.each`
    input | expected
    ${"//[;;;]\n1;;;2"}|${3}
    ${"//[||]\n1||2||3"}|${6}
    ${"//['''']\n1''''2''''1"}|${4}
    `("should be able to have multiple of the delimitor and return the sum $expected when given the string '$input'",({input,expected})=>{
    const result=add(input);
    expect(result).toBe(expected);
    })
    it.each`
    input | expected
    ${"//[;;;][!!]\n1;;;2!!1"}|${4}
    ${"//[||][#]\n1||2||3#4"}|${10}
    ${"//[''''][@]\n1@2''''1"}|${4}
    `("should be able to have multiple sized delimitors and return the sum $expected when given the string '$input'",({input,expected})=>{
    const result=add(input);
    expect(result).toBe(expected);
    })
});

