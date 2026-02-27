# UI.md — User Interface Instructions

This document defines **all** UI component rules and patterns for this project.

---

## Component Library

**shadcn/ui** is the **only** UI component library used in this application.

- **Never** create custom UI components from scratch
- **Never** install alternative component libraries (Material-UI, Ant Design, Chakra UI, etc.)
- **Always** use shadcn/ui components for all UI elements

---

## shadcn/ui Configuration

This project uses shadcn/ui with the following configuration:

- **Style**: New York
- **Base color**: Slate
- **CSS variables**: Enabled
- **Tailwind CSS**: v4
- **Icons**: Lucide React

Configuration is defined in `components.json`.

---

## Adding Components

To add a new shadcn/ui component:

```bash
npx shadcn add <component-name>
```

Examples:
```bash
npx shadcn add button
npx shadcn add card
npx shadcn add input
npx shadcn add dialog
```

Components are installed into the `/components/ui` directory and can be imported directly:

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

---

## Available Components

Before creating any UI element, check if shadcn/ui already provides it:

**Form Elements**: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Label, Form

**Layout**: Card, Separator, Tabs, Accordion, Collapsible, Sheet, Dialog, Drawer

**Navigation**: Navigation Menu, Breadcrumb, Pagination, Menubar, Context Menu, Dropdown Menu

**Feedback**: Alert, Alert Dialog, Toast, Progress, Skeleton, Badge

**Data Display**: Table, Avatar, Tooltip, Popover, Hover Card, Calendar, Command

**Overlay**: Dialog, Sheet, Popover, Tooltip, Context Menu, Dropdown Menu

[View full component list](https://ui.shadcn.com/docs/components)

---

## Component Usage Rules

### 1. Never Create Custom Components

❌ **Don't** create custom buttons, inputs, cards, etc.

```tsx
// ❌ WRONG
export function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}
```

✅ **Do** use shadcn/ui Button component

```tsx
// ✅ CORRECT
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return <Button>Click me</Button>;
}
```

### 2. Use Component Variants

shadcn/ui components come with built-in variants. Use them instead of custom styling:

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### 3. Compose Components

Build complex UIs by composing shadcn/ui primitives:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LinkCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Short Link</CardTitle>
        <CardDescription>Your shortened URL</CardDescription>
      </CardHeader>
      <CardContent>
        <p>https://short.link/abc123</p>
      </CardContent>
      <CardFooter>
        <Button>Copy Link</Button>
      </CardFooter>
    </Card>
  );
}
```

### 4. Use cn() for Conditional Styling

When you need to add custom Tailwind classes to shadcn components, use the `cn()` utility:

```tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

<Button className={cn("w-full", isLoading && "opacity-50")}>
  Submit
</Button>
```

---

## Forms

For forms, use shadcn/ui's Form components built on React Hook Form:

```bash
npx shadcn add form
npx shadcn add input
npx shadcn add label
```

```tsx
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LinkForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Shorten</Button>
      </form>
    </Form>
  );
}
```

---

## Dialogs and Modals

For modals, popups, and overlays, use shadcn/ui Dialog or Sheet components:

```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive">Confirm Delete</Button>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Icons

Use **Lucide React** for all icons (already configured with shadcn/ui):

```tsx
import { Link, Copy, Trash2, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

<Button>
  <Link className="mr-2 h-4 w-4" />
  Create Link
</Button>
```

**Never** install or use other icon libraries (FontAwesome, Heroicons, React Icons, etc.).

---

## Tables

For displaying tabular data, use shadcn/ui Table component:

```bash
npx shadcn add table
```

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function LinksTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Short Code</TableHead>
          <TableHead>Original URL</TableHead>
          <TableHead>Clicks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>abc123</TableCell>
          <TableCell>https://example.com</TableCell>
          <TableCell>42</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

---

## Styling Guidelines

### Use Tailwind Utilities

Apply Tailwind CSS classes directly to shadcn/ui components:

```tsx
<Card className="max-w-md mx-auto mt-8">
  <CardContent className="space-y-4">
    <Input className="w-full" />
    <Button className="w-full">Submit</Button>
  </CardContent>
</Card>
```

### Dark Mode

shadcn/ui components support dark mode out of the box via CSS variables. Use the `dark:` prefix for dark mode styles:

```tsx
<div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
  Content
</div>
```

### Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

---

## Forbidden Patterns

**Never** do the following:

❌ Create custom button, input, or form components  
❌ Install Material-UI, Ant Design, Chakra UI, or similar libraries  
❌ Use inline styles (`style={{}}`) instead of Tailwind classes  
❌ Install icon libraries other than Lucide React  
❌ Copy UI component code from other sources without using shadcn/ui  
❌ Create custom modal/dialog implementations  

---

## When shadcn/ui Doesn't Have a Component

If shadcn/ui doesn't provide a specific component you need:

1. Check if you can compose existing shadcn components to achieve the design
2. Check if there's a Radix UI primitive you can use (shadcn is built on Radix)
3. Only as a last resort, create a minimal custom component using Tailwind CSS

Even for custom components, maintain consistency with shadcn/ui's design patterns and use the `cn()` utility.

---

## Summary Checklist

Before implementing any UI element, verify:

- [ ] shadcn/ui is used for all standard UI components
- [ ] No custom buttons, inputs, cards, or forms are created from scratch
- [ ] Component variants are used instead of custom styling
- [ ] Lucide React is used for all icons
- [ ] `cn()` utility is used for conditional Tailwind classes
- [ ] Forms use shadcn/ui Form components with React Hook Form
- [ ] Dialogs/modals use shadcn/ui Dialog or Sheet components
- [ ] No alternative UI libraries are installed
