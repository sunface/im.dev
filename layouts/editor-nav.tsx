import {
    chakra,
    Flex,
    Button,
    IconButton,
    useColorMode,
    useColorModeValue,
    Box,
    useRadioGroup,
    HStack,
    Input
} from "@chakra-ui/react"
import { useViewportScroll } from "framer-motion"
import NextLink from "next/link"
import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import Logo, { LogoIcon } from "src/components/logo"
import RadioCard from "components/radio-card"
import { EditMode } from "src/types/editor"




function HeaderContent(props:any) {
    const { toggleColorMode: toggleMode } = useColorMode()
    const text = useColorModeValue("dark", "light")
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)

    const editOptions = [EditMode.Edit,EditMode.Preview]
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "framework",
        defaultValue: EditMode.Edit,
        onChange: (v) => {
            props.changeEditMode(v)
        },
    })
    const group = getRootProps()


    return (
        <>
            <Flex w="100%" h="100%" align="center" justify="space-between" px={{ base: "4", md: "6" }}>
                <Flex align="center">
                    <NextLink href="/" passHref>
                        <chakra.a display={{ base: "none", md: "block" }} style={{ marginTop: '-5px' }} aria-label="Chakra UI, Back to homepage">
                            <Logo width="130" />
                        </chakra.a>
                    </NextLink>
                    <NextLink href="/" passHref>
                        <chakra.a display={{ base: "block", md: "none" }} aria-label="Chakra UI, Back to homepage">
                            <LogoIcon />
                        </chakra.a>
                    </NextLink>
                </Flex>
                <Box>
                    <Input value={props.ar.title} placeholder="Title..." onChange={props.changeTitle} focusBorderColor={useColorModeValue('teal.400','teal.100')} variant="flushed"/>
                </Box>
                <HStack {...group}>
                    {editOptions.map((value) => {
                        const radio = getRadioProps({ value })
                        return (
                            <RadioCard key={value} {...radio} bg="teal" color="white">
                                {value}
                            </RadioCard>
                        )
                    })}
                </HStack>
                <Box
                    color={useColorModeValue("gray.500", "gray.400")}
                >
                    <IconButton
                        size="md"
                        fontSize="lg"
                        aria-label={`Switch to ${text} mode`}
                        variant="ghost"
                        color="current"
                        ml={{ base: "0", md: "1" }}
                        onClick={toggleMode}
                        _focus={null}
                        icon={<SwitchIcon />}
                    />
                    <Button layerStyle="colorButton" ml="2" onClick={props.publish}>发布</Button>
                </Box>
            </Flex>
        </>
    )
}

function EditorNav(props) {
    const bg = useColorModeValue("white", "gray.800")
    const ref = React.useRef<HTMLHeadingElement>()
    const [y, setY] = React.useState(0)
    const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

    const { scrollY } = useViewportScroll()
    React.useEffect(() => {
        return scrollY.onChange(() => setY(scrollY.get()))
    }, [scrollY])

    return (
        <chakra.header
            ref={ref}
            shadow={y > height ? "sm" : undefined}
            transition="box-shadow 0.2s"
            pos="fixed"
            top="0"
            zIndex="3"
            bg={bg}
            left="0"
            right="0"
            borderTop="4px solid"
            borderTopColor="teal.400"
            width="full"
        >
            <chakra.div height="4.5rem" mx="auto" maxW="1200px">
                <HeaderContent {...props} />
            </chakra.div>
        </chakra.header>
    )
}

export default EditorNav

