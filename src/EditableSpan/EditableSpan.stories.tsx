import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],

    argTypes: {
        onChange: {
            description: 'value EditableSpan change',
            action: 'clicked'
        }
    },
    args: {
        value: 'HTML'
    }
}

export default meta;
type Story = StoryObj<typeof EditableSpan>;
export const EditableSpanStory: Story = {}


