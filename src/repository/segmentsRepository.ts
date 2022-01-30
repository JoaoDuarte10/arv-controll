interface ISegment {
    segment: string
}

interface SegmentRepository {
    findSegment(): Promise<ISegment[]>
}

export { ISegment, SegmentRepository }