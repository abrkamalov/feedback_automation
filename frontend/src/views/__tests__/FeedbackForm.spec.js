import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FeedbackForm from '../FeedbackForm.vue'

vi.mock('@/components/ui/toast/', () => ({
    Toaster: { template: '<div></div>' }
}))
vi.mock('@/components/ui/toast/use-toast', () => ({
    useToast: () => ({ toast: vi.fn() })
}))
vi.mock('@/services/apiService', () => ({
    default: {
        post: vi.fn()
    }
}))

vi.mock('@/components/ui/card', () => ({
    Card: { template: '<div><slot></slot></div>' },
    CardContent: { template: '<div><slot></slot></div>' },
    CardDescription: { template: '<div><slot></slot></div>' },
    CardFooter: { template: '<div><slot></slot></div>' },
    CardHeader: { template: '<div><slot></slot></div>' },
    CardTitle: { template: '<div class="text-2xl"><slot></slot></div>' }
}))
vi.mock('@/components/ui/button', () => ({
    Button: { template: '<button type="button"><slot></slot></button>' }
}))
vi.mock('@/components/ui/input', () => ({
    Input: { template: '<input />' }
}))
vi.mock('@/components/ui/label', () => ({
    Label: { template: '<label><slot></slot></label>' }
}))
vi.mock('@/components/ui/textarea', () => ({
    Textarea: { template: '<textarea></textarea>' }
}))
vi.mock('lucide-vue-next', () => ({
    Loader2Icon: { template: '<svg></svg>' }
}))

describe('FeedbackForm', () => {
    it('renders correctly', () => {
        const wrapper = mount(FeedbackForm)
        expect(wrapper.find('.text-2xl').text()).toBe('Guest Feedback')
        expect(wrapper.findAll('input')).toHaveLength(2)
        expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('shows validation errors when form is submitted empty', async () => {
        const wrapper = mount(FeedbackForm)
        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll('p.text-sm.text-red-500')).toHaveLength(3)
    })

    it('submits the form successfully', async () => {
        const wrapper = mount(FeedbackForm)
        
        await wrapper.find('#guest_name').setValue('John Doe')
        await wrapper.find('#room_number').setValue('101')
        await wrapper.find('#content').setValue('Mouse in the room')

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        
        expect(wrapper.vm.feedback.guest_name).toBe('')
        expect(wrapper.vm.feedback.room_number).toBe('')
        expect(wrapper.vm.feedback.content).toBe('')
    })
})