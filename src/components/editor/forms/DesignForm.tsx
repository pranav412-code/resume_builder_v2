import React from 'react';
import { ResumeData, TemplateId, LayoutItem } from '../../../types';
import { GripVertical, Scissors } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DesignFormProps {
    data: ResumeData;
    updateData: (data: ResumeData) => void;
}

interface SortableSectionProps {
    item: LayoutItem;
    onAddPageBreak: () => void;
}

function SortableSection({ item, onAddPageBreak }: SortableSectionProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800 group transition-all ${isDragging ? 'opacity-50 scale-105 shadow-lg shadow-indigo-500/20' : ''
                }`}
        >
            <div className="flex items-center gap-3">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-1 hover:bg-slate-800 rounded transition-colors"
                >
                    <GripVertical size={16} className="text-slate-600 group-hover:text-slate-400" />
                </div>
                <span className="text-xs font-bold text-slate-300 capitalize">{item.type}</span>
            </div>
            <button
                onClick={onAddPageBreak}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-800 rounded text-slate-600 hover:text-indigo-400 flex items-center gap-1.5 text-[10px] font-bold uppercase"
                title="Insert page break after this section"
            >
                <Scissors size={12} /> Break
            </button>
        </div>
    );
}

export const DesignForm: React.FC<DesignFormProps> = ({ data, updateData }) => {
    const templates: TemplateId[] = ['modern', 'classic', 'minimal', 'professional'];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = data.sectionOrder.findIndex((item) => item.id === active.id);
            const newIndex = data.sectionOrder.findIndex((item) => item.id === over.id);

            const newOrder = arrayMove(data.sectionOrder, oldIndex, newIndex);
            updateData({ ...data, sectionOrder: newOrder });
        }
    };

    const addPageBreak = (afterIndex: number) => {
        const newOrder = [...data.sectionOrder];
        const pageBreakItem: LayoutItem = {
            id: `pageBreak-${Date.now()}`,
            type: 'pageBreak',
        };
        newOrder.splice(afterIndex + 1, 0, pageBreakItem);
        updateData({ ...data, sectionOrder: newOrder });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h3 className="text-white font-bold text-xl mb-4">Architecture</h3>
                <div className="grid grid-cols-2 gap-3">
                    {templates.map((t) => (
                        <button
                            key={t}
                            onClick={() => updateData({ ...data, template: t })}
                            className={`p-4 rounded-2xl border-2 transition-all text-center capitalize font-bold text-sm ${data.template === t
                                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                        Section Layout
                    </h4>
                    <div className="text-[9px] text-slate-600 font-semibold">
                        Drag to reorder • Click scissors to add page break
                    </div>
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                            {data.sectionOrder.map((item, idx) => (
                                <SortableSection
                                    key={item.id}
                                    item={item}
                                    onAddPageBreak={() => addPageBreak(idx)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};
