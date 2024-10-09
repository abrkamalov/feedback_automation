import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminDashboard from '../AdminDashboard.vue'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/stores/feedbackStore', () => ({
    useFeedbackStore: vi.fn(() => ({
        feedbacks: [
            { id: 1, guest_name: 'John Doe', room_number: '101', content: 'Mouse in the room', tags: [], action_logs: [] }
        ],
        fetchFeedbacks: vi.fn(),
        removeFeedback: vi.fn()
    }))
}))

vi.mock('@/components/ui/table', () => ({
    Table: { template: '<table><slot></slot></table>' },
    TableBody: { template: '<tbody><slot></slot></tbody>' },
    TableCell: { template: '<td><slot></slot></td>' },
    TableHead: { template: '<th><slot></slot></th>' },
    TableHeader: { template: '<thead><slot></slot></thead>' },
    TableRow: { template: '<tr><slot></slot></tr>' }
}))
vi.mock('@/components/ui/button', () => ({
    Button: { template: '<button><slot></slot></button>' }
}))
vi.mock('@/components/ui/badge', () => ({
    Badge: { template: '<span><slot></slot></span>' }
}))
vi.mock('lucide-vue-next', () => ({
    XIcon: { template: '<svg></svg>' }
}))

describe('AdminDashboard', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renders correctly and displays feedback data', () => {
        const wrapper = mount(AdminDashboard)
        expect(wrapper.find('h1').text()).toBe('Guest Feedback Management')
        expect(wrapper.findAll('th')).toHaveLength(6)
        expect(wrapper.find('tbody tr').exists()).toBe(true)
        expect(wrapper.find('tbody tr td').text()).toBe('John Doe')
    })

    it('calls removeFeedback when remove button is clicked', async () => {
        const wrapper = mount(AdminDashboard)
        const removeButton = wrapper.find('button')

        vi.spyOn(window, 'confirm').mockImplementation(() => true)

        await removeButton.trigger('click')

        expect(wrapper.vm.feedbackStore.removeFeedback).toHaveBeenCalledWith(1)
    })
})