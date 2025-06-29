import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    html: {
      fontSize: "15px", // 1rem = 15px
    },
  },
  theme: {
    keyframes: {
      slideInGradient: {
        "0%": { backgroundSize: "0% 100%" },
        "100%": { backgroundSize: "100% 100%" },
      },
      slideOutGradient: {
        "0%": { backgroundSize: "100% 100%" },
        "100%": { backgroundSize: "0% 100%" },
      },
      dontSlideGradient: {
        "0%": { backgroundSize: "100% 100%" },
        "100%": { backgroundSize: "100% 100%" },
      },
    },
    tokens: {
      colors: {
        blue: {
          50: { value: "#0051BA" }, // Pantone 293 C
          100: { value: "#003366" },
          200: { value: "#0153C1" },
          300: { value: "#42D0FF" },
          400: { value: "#99C7FF" },
        },
        green: {
          50: { value: "#029347" }, // Pantone 348 C
          100: { value: "#1B4D3E" },
          300: { value: "#00FF7F" },
          400: { value: "#C1E6CD" },
        },
        wcawhite: {
          50: { value: "#FFFFFF" }, // Pantone White
          100: { value: "#FCFCFC" },
          200: { value: "#3B3B3B" },
          300: { value: "#E0DDD5" },
          400: { value: "#F4F1ED" },
          500: { value: "#F9F9F9" },
        },
        red: {
          50: { value: "#C62535" }, // Pantone 1797 C
          100: { value: "#7A1220" },
          300: { value: "#FF6B6B" },
          400: { value: "#F6C5C5" },
        },
        yellow: {
          50: { value: "#FFD313" }, // Pantone 116 C
          100: { value: "#664D00" },
          300: { value: "#FFF5AA" },
          400: { value: "#FFF5B8" },
        },
        orange: {
          50: { value: "#FF5800" }, // Pantone Orange 021 C
          100: { value: "#7A2B00" },
          300: { value: "#FFD59E" },
          400: { value: "#FFD5BD" },
        },
        supplementary: {
          texts: {
            light: { value: "#FCFCFC" },
            dark: { value: "#1E1E1E" },
            gray1: { value: "#6B6B6B" },
            gray2: { value: "#3B3B3B" },
          },
          bgs: {
            white: { value: "#FCFCFC" },
            light: { value: "#EDEDED" },
            medium: { value: "#DCDCDC" },
            dark: { value: "#1E1E1E" },
            mid: { value: "#B8B8B8" },
            soft: { value: "#F9F9F9" },
            transparent: { value: "rgba(0,0,0,0)" },
          },
          links: {
            blue: { value: "#0051BA" },
          },
        },
      },
    },
    semanticTokens: {
      sizes: {
        "table.xs.cellPadding": { value: "{sizes.table-xs.cellPadding}" },
        "table.xs.fontSize": { value: "{sizes.table-xs.fontSize}" },
      },
      shadows: {
        wca: {
          value: {
            _light: "rgba(17, 17, 26, 0.3) 0px 0px 16px",
            _dark: "rgba(252, 252, 252, 0.4) 0px 0px 16px",
          },
        },
      },
      colors: {
        primary: { value: "{colors.blue.50}" },
        secondary: { value: "{colors.green.50}" },
        background: { value: "{colors.white.50}" },
        transparent: { value: "{colors.supplementary.bgs.transparent}" },
        whiteText: { value: "{colors.supplementary.texts.light}" },
        textPrimary: { value: "{colors.supplementary.texts.dark}" },
        textSecondary: { value: "{colors.supplementary.texts.gray1}" },
        lightBackground: { value: "{colors.supplementary.bgs.light}" },
        mediumBackground: { value: "{colors.supplementary.bgs.medium}" },
        link: { value: "{colors.supplementary.links.blue}" },
        danger: { value: "{colors.red.50}" },
        warning: { value: "{colors.yellow.50}" },
        success: { value: "{colors.green.100}" },
        recordColors: {
          personal: { value: "{colors.orange.50}" },
          national: { value: "{colors.green.50}" },
          continental: { value: "{colors.red.50}" },
          world: { value: "{colors.blue.50}" },
        },
        grey: {
          solid: {
            value: {
              _light: "colors.wcawhite.400",
              _dark: "colors.wcawhite.200",
            },
          },
          contrast: {
            value: {
              _light: "colors.supplementary.texts.dark",
              _dark: "colors.supplementary.texts.light",
            },
          },
          fg: { value: "{colors.wcawhite.300}" },
          muted: { value: "{colors.wcawhite.200/90}" },
          subtle: { value: "{colors.wcawhite.200}" },
          emphasized: { value: "{colors.wcawhite.400}" },
          focusRing: {
            value: {
              _light: "colors.wcawhite.50",
              _dark: "colors.wcawhite.200",
            },
          },
          spanBg: { value: "#3e3e3e" },
          cls1: { value: "#3e3e3e" },
          cls2: { value: "#7a7a7a" },
          cls3: { value: "#dcdcdc" },
          cls4: { value: "#525252" },
        },
        black: {
          spanBg: { value: "#1e1e1e" },
          cls1: { value: "#1e1e1e" },
          cls2: { value: "#3b3b3b" },
          cls3: { value: "#6b6b6b" },
          cls4: { value: "#282828" },
        },
        yellow: {
          solid: {
            value: { _light: "colors.yellow.50", _dark: "colors.yellow.100" },
          },
          highContrast: {
            value: { _light: "colors.yellow.50", _dark: "colors.yellow.300" },
          },
          contrast: {
            value: {
              _light: "colors.supplementary.texts.dark",
              _dark: "colors.supplementary.texts.light",
            },
          },
          fg: { value: "{colors.yellow.400}" },
          muted: { value: "{colors.yellow.100/90}" },
          subtle: { value: "{colors.yellow.100}" },
          emphasized: { value: "{colors.yellow.300}" },
          focusRing: {
            value: { _light: "colors.yellow.50", _dark: "colors.yellow.100" },
          },
          gradient: {
            default: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.yellow.fg} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.yellow.muted} 0%, {colors.bg} 100%)",
              },
            },
            hover: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.yellow.fg/80} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.yellow.muted/80} 0%, {colors.bg} 100%)",
              },
            },
          },
          spanBg: { value: "#664d00" },
          cls1: { value: "#664d00" },
          cls2: { value: "#ffd313" },
          cls3: { value: "#ffde55" },
          cls4: { value: "#cea705" },
        },
        green: {
          solid: {
            value: { _light: "colors.green.50", _dark: "colors.green.100" },
          },
          highContrast: {
            value: { _light: "colors.green.50", _dark: "colors.green.300" },
          },
          contrast: { value: "{colors.supplementary.texts.light}" },
          fg: { value: "{colors.green.400}" },
          muted: { value: "{colors.green.100/90}" },
          subtle: { value: "{colors.green.100}" },
          emphasized: { value: "{colors.green.300}" },
          focusRing: {
            value: { _light: "colors.green.50", _dark: "colors.green.100" },
          },
          gradient: {
            default: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.green.fg} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.green.muted} 0%, {colors.bg} 100%)",
              },
            },
            hover: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.green.fg/80} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.green.muted/80} 0%, {colors.bg} 100%)",
              },
            },
          },
          spanBg: { value: "#1B4D3E" },
          cls1: { value: "#1B4D3E" },
          cls2: { value: "#049347" },
          cls3: { value: "#04632D" },
          cls4: { value: "#1AB55C" },
        },
        blue: {
          solid: {
            value: { _light: "colors.blue.50", _dark: "colors.blue.100" },
          },
          highContrast: {
            value: { _light: "colors.blue.50", _dark: "colors.blue.300" },
          },
          contrast: { value: "{colors.supplementary.texts.light}" },
          fg: { value: "{colors.blue.400}" },
          muted: { value: "{colors.blue.100/90}" },
          subtle: { value: "{colors.blue.100}" },
          emphasized: { value: "{colors.blue.300}" },
          focusRing: {
            value: { _light: "colors.blue.50", _dark: "colors.blue.100" },
          },
          gradient: {
            default: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.blue.fg} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.blue.muted} 0%, {colors.bg} 100%)",
              },
            },
            hover: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.blue.fg/80} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.blue.muted/80} 0%, {colors.bg} 100%)",
              },
            },
          },
          spanBg: { value: "#003366" },
          cls1: { value: "#003366" },
          cls2: { value: "#0051BA" },
          cls3: { value: "#03458C" },
          cls4: { value: "#066AC4" },
        },
        red: {
          solid: {
            value: { _light: "colors.red.50", _dark: "colors.red.100" },
          },
          highContrast: {
            value: { _light: "colors.red.50", _dark: "colors.red.300" },
          },
          contrast: { value: "{colors.supplementary.texts.light}" },
          fg: { value: "{colors.red.400}" },
          muted: { value: "{colors.red.100/90}" },
          subtle: { value: "{colors.red.100}" },
          emphasized: { value: "{colors.red.300}" },
          focusRing: {
            value: { _light: "colors.red.50", _dark: "colors.red.100" },
          },
          gradient: {
            default: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.red.fg} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.red.muted} 0%, {colors.bg} 100%)",
              },
            },
            hover: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.red.fg/80} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.red.muted/80} 0%, {colors.bg} 100%)",
              },
            },
          },
          spanBg: { value: "#7A1220" },
          cls1: { value: "#7A1220" },
          cls2: { value: "#CF1A1B" },
          cls3: { value: "#A3131A" },
          cls4: { value: "#E53841" },
        },
        orange: {
          solid: {
            value: { _light: "colors.orange.50", _dark: "colors.orange.100" },
          },
          highContrast: {
            value: { _light: "colors.orange.50", _dark: "colors.orange.300" },
          },
          contrast: {
            value: {
              _light: "colors.supplementary.texts.dark",
              _dark: "colors.supplementary.texts.light",
            },
          },
          fg: { value: "{colors.orange.400}" },
          muted: { value: "{colors.orange.100/90}" },
          subtle: { value: "{colors.orange.100}" },
          emphasized: { value: "{colors.orange.300}" },
          focusRing: {
            value: { _light: "colors.orange.50", _dark: "colors.orange.100" },
          },
          gradient: {
            default: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.orange.fg} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.orange.muted} 0%, {colors.bg} 100%)",
              },
            },
            hover: {
              value: {
                _light:
                  "linear-gradient(90deg, {colors.orange.fg/80} 0%, {colors.bg} 100%)",
                _dark:
                  "linear-gradient(90deg, {colors.orange.muted/80} 0%, {colors.bg} 100%)",
              },
            },
          },
          spanBg: { value: "#7A2B00" },
          cls1: { value: "#7A2B00" },
          cls2: { value: "#FF5800" },
          cls3: { value: "#D34405" },
          cls4: { value: "#F96E32" },
        },
        bg: {
          DEFAULT: {
            value: {
              _light: "colors.supplementary.bgs.white",
              _dark: "colors.supplementary.bgs.dark",
            },
          },
          inverted: {
            value: {
              _light: "colors.supplementary.bgs.white",
              _dark: "colors.supplementary.bgs.dark",
            },
          },
          muted: {
            value: {
              _light: "colors.supplementary.bgs.medium",
              _dark: "colors.supplementary.texts.gray2",
            },
          },
        },
        fg: {
          DEFAULT: {
            value: {
              _light: "colors.supplementary.texts.dark",
              _dark: "colors.supplementary.texts.light",
            },
          },
          inverted: {
            value: {
              _light: "colors.supplementary.texts.dark",
              _dark: "colors.supplementary.texts.light",
            },
          },
        },
      },
    },

    recipes: {
      button: {
        base: {
          transitionProperty: "background, border, color, borderColor",
          transitionTimingFunction: "ease",
          borderRadius: "l3",
          lineHeight: "1.2",
          colorPalette: "blue",
        },
        variants: {
          variant: {
            solid: {
              borderWidth: "2px",
              borderColor: "colorPalette.solid",
              bg: "colorPalette.solid",
              color: "colorPalette.contrast",
              _hover: {
                bg: "colorPalette.muted",
                borderColor: "colorPalette.muted",
                color: "whiteText",
              },
              _expanded: {
                bg: "colorPalette.muted",
                borderColor: "colorPalette.muted",
              },
            },
            outline: {
              borderWidth: "2px",
              borderColor: "colorPalette.solid",
              color: "fg.DEFAULT",
              bg: "transparent",
              _hover: {
                bg: "colorPalette.fg/30",
              },
            },
            ghost: {
              borderWidth: "0px",
              bg: "transparent",
              color: "fg.DEFAULT",
              focusRing: "colorPalette.highContrast",
              _hover: {
                color: "colorPalette.highContrast",
                bg: "transparent",
              },
              _expanded: {
                bg: "transparent",
              },
            },
            surface: {
              color: "whiteText",
            },
            plain: {
              color: "colorPalette.subtle",
              bg: "lightBackground",
              _hover: {
                bg: "mediumBackground",
              },
            },
          },
          size: {
            sm: {
              padding: "3",
              textStyle: "sm",
            },
            lg: {
              px: "6",
              py: "2.5",
              textStyle: "sm",
            },
          },
        },
        defaultVariants: {
          // @ts-expect-error TODO: Fix this
          variant: "solid",
          size: "lg",
        },
      },
      heading: {
        base: {},
        variants: {
          size: {
            sm: {
              fontWeight: "medium", //Not used in styleguide
            },
            md: {
              fontWeight: "medium", //Subheading 2
              textStyle: "lg", //same size as lg, just thinner
            },
            lg: {
              fontWeight: "bold", //Subheading 1
            },
            xl: {
              fontWeight: "bold", //Not used in styleguide
            },
            "2xl": {
              fontWeight: "extrabold", //H4
            },
            "3xl": {
              fontWeight: "extrabold", //H3
            },
            "4xl": {
              fontWeight: "extrabold", //H2
            },
            "5xl": {
              fontWeight: "extrabold", //H1
              textTransform: "uppercase",
            },
            "6xl": {
              fontWeight: "extrabold", //Not used in styleguide
            },
          },
        },
      },
      link: {
        base: {
          transitionProperty: "color",
          transitionTimingFunction: "ease",
          transitionDuration: "200ms",
        },
        variants: {
          variant: {
            wcaLink: {
              color: "{colors.blue.highContrast}",
              fontWeight: "medium",
              _hover: {
                color: "{colors.blue.highContrast/80}",
              },
            },
            plainLink: {
              color: "{fg.inverse}",
              fontWeight: "medium",
              _hover: {
                color: "{colors.blue.highContrast}",
              },
            },
            colouredLink: {
              color: "{fg.inverse}",
              fontWeight: "medium",
              _hover: {
                color: "colorPalette.highContrast",
              },
            },
          },
          hoverArrow: {
            true: {
              position: "relative",
              paddingRight: "10px",
              _after: {
                content: '""',
                position: "absolute",
                top: "60%",
                right: "0",
                width: "7px",
                height: "12px",
                backgroundImage: "url('/linkArrow.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                transform: "translateY(-50%) translateX(-8px)",
                transition: "all 0.3s ease-in-out",
                opacity: 0,
              },
              _hover: {
                color: "{colors.blue.highContrast/80}",
                _after: {
                  transform: "translateY(-50%) translateX(0px)",
                  opacity: 1,
                },
              },
            },
          },
        },
        defaultVariants: {
          // @ts-expect-error TODO: Fix this
          variant: "wcaLink",
          hoverArrow: "false",
        },
      },
      badge: {
        variants: {
          variant: {
            achievement: {
              bg: "transparent",
              color: "fg",
              fontWeight: "medium",
              gap: "2",
              mr: "2.5",
            },
            information: {
              bg: "transparent",
              color: "colorPalette.contrast",
              fontWeight: "light",
              gap: "2",
              mr: "2.5",
            },
          },
        },
        compoundVariants: [
          {
            variant: "achievement",
            css: {
              textStyle: "lg", //needed to supercede the default textStyle
              // @ts-expect-error TODO: Fix this
              svg: {
                height: "1.25em",
                width: "1.25em",
              },
            },
          },
          {
            variant: "information",
            css: {
              textStyle: "md", //needed to supercede the default textStyle
              // @ts-expect-error TODO: Fix this
              svg: {
                height: "1.1em",
                width: "1.1em",
              },
              img: {
                height: "1.1em",
                width: "auto",
                borderRadius: "3px",
              },
            },
          },
        ],
      },
      prose: {
        base: {
          "& a": {
            color: "{colors.blue.highContrast}",
            fontWeight: "medium",
            _hover: {
              color: "{colors.blue.highContrast/80}",
            },
          },
        },
      },
    },
    slotRecipes: {
      card: {
        base: {
          root: {
            shadow: "{shadows.wca}",
            colorPalette: "grey",
            borderRadius: "xl",
          },
        },
        defaultVariants: {
          // @ts-expect-error TODO: Fix this
          size: "sm",
        },
        variants: {
          variant: {
            hero: {
              body: {
                bg: "colorPalette.solid",
                color: "colorPalette.contrast",
              },
            },
            summary: {
              body: {
                bg: "colorPalette.solid",
                color: "colorPalette.contrast",
                p: "7",
                gap: "3",
              },
            },
            info: {
              root: {
                overflow: "hidden",
              },
              body: {
                bg: "colorPalette.solid",
                color: "colorPalette.contrast",
                gap: "4",
              },
              title: {
                fontWeight: "extrabold",
              },
              description: {
                color: "colorPalette.contrast",
              },
            },
            plain: {
              root: {
                overflow: "hidden",
                bg: "bg",
                p: "2",
                w: "100%",
                flexGrow: "1",
              },
              body: {
                gap: "4",
              },
            },
            infoSnippet: {
              root: {
                shadow: "none",
              },
              body: {
                p: "0px",
              },
              header: {
                p: "0px",
                fontWeight: "semibold",
                flexDirection: "row",
                alignItems: "center",
                gap: "1",
              },
            },
          },
        },
        compoundVariants: [
          {
            variant: "info",
            css: {
              title: { textStyle: "4xl" }, //needed to supercede the default textStyle
            },
          },
          {
            variant: "infoSnippet",
            css: {
              header: {
                // @ts-expect-error TODO: Fix this
                svg: {
                  height: "1.15em",
                  width: "1.15em",
                },
              },
            },
          },
        ],
      },
      checkboxCard: {
        slots: [],
        variants: {
          size: {
            xs: {
              root: {
                textStyle: "xs",
              },
              control: {
                padding: "1",
                gap: "0.5",
              },
              addon: {
                px: "1.5",
                py: "0.5",
                borderTopWidth: "1px",
              },
              indicator: {
                boxSize: "2",
              },
            },
          },
        },
      },
      segmentGroup: {
        slots: [],
        variants: {
          variant: {
            inset: {
              root: {
                bg: "transparent",
              },
              item: {
                px: "5",
                py: "2.5",
                fontWeight: "600",
                border: "2px solid",
                borderColor: "colorPalette.solid",
                color: "colorPalette.highContrast",
                bg: "transparent",
                borderRadius: "0",
                transition: "all 250ms",
                cursor: "pointer",
                _first: {
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  borderRight: "0px",
                },
                _last: {
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  borderLeft: "0px",
                },
                _checked: {
                  bg: "colorPalette.solid",
                  color: "colorPalette.contrast",
                  boxShadow: "inset rgba(0, 0, 0, 0.25) 0 0 5px 0",
                },
                "&:not([data-state=checked]):hover": {
                  bg: "colorPalette.fg/30",
                },
              },
              indicator: {
                display: "none",
              },
            },
          },
        },
      },
      accordion: {
        slots: [],
        variants: {
          variant: {
            subtle: {
              root: {
                "--accordion-radius": "radii.l3",
              },
              item: {
                borderColor: "{colors.supplementary.bgs.mid}",
                borderWidth: "1px",
                marginBottom: "3",
                _open: {
                  bg: "bg",
                },
              },
              itemTrigger: {
                bgImage: "var(--chakra-colors-color-palette-gradient-hover)",
                backgroundSize: "0% 100%", // Ensures the gradient fills the element
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-100% 0%",
                animation: "slideOutGradient 0.25s ease-in-out forwards",
                _hover: {
                  animation: "slideInGradient 0.25s ease-in-out forwards",
                },
                _open: {
                  bgImage:
                    "var(--chakra-colors-color-palette-gradient-default)",
                  borderTopRadius: "var(--accordion-radius)",
                  borderBottomRadius: "0",
                  backgroundSize: "100% 100%",
                  animation: "dontSlideGradient 0.25s ease-in-out forwards",
                  _hover: {
                    bgImage:
                      "var(--chakra-colors-color-palette-gradient-hover)",
                    animation: "dontSlideGradient 0.25s ease-in-out forwards",
                  },
                },
              },
            },
          },
        },
      },
      table: {
        slots: [],
        variants: {
          variant: {
            results: {
              cell: {
                p: "0",
              },
            },
            competitions: {
              root: {
                tableLayout: "auto",
              },
              cell: {
                width: "1%",
                whiteSpace: "noWrap",
                padding: "0",
                "& img": {
                  height: "1.1em",
                  width: "2.8em",
                  borderRadius: "3px",
                },
              },
              row: {
                "& td": {
                  transitionProperty: "background-color",
                  transitionTimingFunction: "ease",
                  transitionDuration: "150ms",
                },
                cursor: "pointer",
                width: "100%",
                "&:nth-of-type(odd) td": {
                  bg: "bg.muted",
                },
                "&:hover td": {
                  bg: "blue.400/60",
                },
              },
            },
          },
          size: {
            xs: {
              root: {
                textStyle: "sm",
              },
              columnHeader: {
                px: "1",
                py: "1",
              },
              cell: {
                px: "1.5",
                py: "1.5",
              },
            },
          },
        },
      },
      drawer: {
        slots: [],
        variants: {
          variant: {
            competitionInfo: {
              content: {
                borderRadius: "xl",
                shadow: "{shadows.wca}",
                height: "max-content",
              },
            },
          },
        },
      },
      tabs: {
        slots: [],
        variants: {
          variant: {
            enclosed: {
              list: {
                bg: "bg",
                shadow: "{shadows.wca}",
                p: "3",
                borderRadius: "xl",
                gap: "3",
              },
              trigger: {
                transitionProperty: "background-color",
                transitionTimingFunction: "ease",
                transitionDuration: "200ms",
                _hover: {
                  bg: "bg.muted/50",
                },
                _selected: {
                  bg: "bg.muted",
                },
                _vertical: {
                  justifyContent: "flex-start",
                },
              },
              content: {
                flexGrow: "1",
              },
            },
            slider: {
              root: {
                width: "100%",
              },
              content: {
                _vertical: {
                  ps: "0px",
                },
                width: "100%",
              },
              trigger: {
                p: "0px",
                width: "1rem",
                height: "1rem",
                bg: "white/50",
                cursor: "pointer",
                minWidth: "1rem",
                borderRadius: "0.5rem",
                _selected: {
                  bg: "white",
                },
              },
            },
            results: {
              content: {
                p: "8",
              },
              trigger: {
                borderRadius: "0",
                color: "fg",
                _notFirst: {
                  _before: {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "1.5em",
                    width: "1.5px",
                    backgroundColor: "#D9D9D9",
                  },
                },
                _selected: {
                  bg: "colorPalette.solid",
                  color: "colorPalette.contrast",
                  _before: {
                    display: "none", // Remove the line when selected
                  },
                },
                "&[data-selected] + &::before": {
                  display: "none",
                },
              },
            },
          },
        },
      },
      dataList: {
        slots: [],
        variants: {
          variant: {
            profileStat: {
              root: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
                rowGap: "0.5rem",
              },
              item: {
                flexDirection: "column-reverse",
                alignItems: "flex-start", // default for left column
                _even: {
                  alignItems: "flex-end", // right column overrides
                },
              },
              itemLabel: {
                fontWeight: "regular",
              },
              itemValue: {
                fontWeight: "semibold",
              },
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
