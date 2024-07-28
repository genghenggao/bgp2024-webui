const NODE_COLOR = '#00CD66';

export default function registerCumtbWeb(lf) {
    lf.register('cumtbweb', ({ RectNode, RectNodeModel, h }) => {
        class StartNode extends RectNode {
            getLabelShape() {
                const { model } = this.props;
                const { x, y } = model;
                return h(
                    'text',
                    {
                        fill: NODE_COLOR,
                        fontSize: 20,
                        fontWeight: 'bold',
                        fontFamily: 'Times New Roman',
                        dominantBaseline: 'middle',
                        textAnchor: 'middle', // horizontally centers the text
                        x: x, // centered horizontally within the rectangle
                        y: y, // centered vertically within the rectangle
                        width: 50,
                        height: 25
                    },
                    'CumtbWeb'
                );
            }

            getShape() {
                const { model } = this.props;
                const { x, y, width, height } = model;
                const { fill, stroke, strokeWidth } = model.getNodeStyle();
                return h(
                    'g',
                    {},
                    [
                        h(
                            'rect',
                            {
                                x: x - width / 2,
                                y: y - height / 2,
                                width,
                                height,
                                fill,
                                stroke,
                                strokeWidth
                            }
                        ),
                        this.getLabelShape()
                    ]
                );
            }
        }

        class StartModel extends RectNodeModel {
            // 自定义节点形状属性
            initNodeData(data) {
                data.text = {
                    value: (data.text && data.text.value) || '',
                    x: data.x,
                    y: data.y + 35,
                    dragable: false,
                    editable: true
                };
                super.initNodeData(data);
                this.width = 160;  // 设置矩形的宽度
                this.height = 40; // 设置矩形的高度
            }

            // 自定义节点样式属性
            getNodeStyle() {
                const style = super.getNodeStyle();
                style.stroke = NODE_COLOR; // 设置矩形框的颜色为红色
                return style;
            }

            // 自定义锚点样式
            getAnchorStyle() {
                const style = super.getAnchorStyle();
                style.hover.r = 8;
                style.hover.fill = "rgb(24, 125, 255)";
                style.hover.stroke = "rgb(24, 125, 255)";
                return style;
            }

            // 自定义节点outline
            getOutlineStyle() {
                const style = super.getOutlineStyle();
                style.stroke = '#88f';
                return style;
            }
        }

        return {
            view: StartNode,
            model: StartModel
        };
    });
}
