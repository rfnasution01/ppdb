import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/helpers/utils'
import { buttonVariants } from '@/libs/variants/button'

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => {
  const classFirst = `
    firstButtonGroup:rounded-tr-none
    firstButtonGroup:rounded-br-none
    `
  const classMiddle = `
    middleButtonGroup:rounded-none
    middleButtonGroup[:not(:hover)]:border-l-0
    `
  const classLast = `
    lastButtonGroup:rounded-tl-none
    lastButtonGroup:rounded-bl-none
    lastButtonGroup[:not(:hover)]:border-l-0`

  const classFirstInnerDiv = `
    [&>:first-child:not(:only-child)>button]:rounded-tr-none
    [&>:first-child:not(:only-child)>button]:rounded-br-none`

  const classMiddleInnerDiv = `
    [&>:not(:first-child):not(:last-child)>button]:rounded-none
    [&>:not(:first-child):not(:last-child)>button]:border-l-0`

  const classLastInnerDiv = `
    [&>:last-child:not(:only-child)>button]:rounded-tl-none
    [&>:last-child:not(:only-child)>button]:rounded-bl-none
    [&>:last-child:not(:only-child)>button]:border-l-0`

  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        [
          'h-10 flex items-center bg-background ',
          classFirst,
          classMiddle,
          classLast,
          classFirstInnerDiv,
          classMiddleInnerDiv,
          classLastInnerDiv,
        ].join(' '),
        className,
      )}
      {...props}
    />
  )
})
Menubar.displayName = MenubarPrimitive.Root.displayName

export interface menubarTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  menubarTriggerProps
>(({ variant, size, colorVariant, layout, className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant, colorVariant, layout, size, className }),
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 outline-none',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1',
      className,
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md',
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="h-3.5 w-3.5 absolute left-2 flex items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'py-1.5 text-sm focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="h-3.5 w-3.5 absolute left-2 flex items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn('py-1.5 text-sm px-2', inset && 'pl-8', className)}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('h-px bg-muted -mx-1 my-1', className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'text-xs tracking-widest text-muted-foreground ml-auto',
        className,
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = 'MenubarShortcut'

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
