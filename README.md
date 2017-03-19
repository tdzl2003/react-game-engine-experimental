## React-Game-Engine实验项目

这个项目的目标大概是这样

1. 基于react思想和编码习惯，来做基于WebGL或Canvas的游戏编程。
2. 考虑游戏场景里的对象，对象加入场景这件事情手动来控制，不去做大量对象的vdom diff。没有必要。
3. 对象内部的结构，包括什么文字啊，血条啊，播放的动画啊特效啊等等均通过react的方式控制。
4. 游戏的UI依然直接用HTML DOM撸（当然也是React），并无必要全体GL化。
5. 和mobx结合使用。

这个项目干了这么几件事情

1. 实现了一个自己的平台无关的react。
2. 实现了一个类似RN的bridge。在WebWorker里去跑React和vdom和mobx，在主脚本去跑dom操作和gl操作。
3. 不支持WebWorker的环境，退化到单线程的执行，但依然可以兼容，时序上可能有少许区别。
3. 结合上述两者，使得山寨的react可以操作普通dom，也可以操作自定义的对象。
4. 实现WebGL渲染的自定义对象。

接下来主要会干这么几件事情
1. bridge需要做batch优化。
2. 实现2d变换和几何渲染用于测试。
3. 实现图片对象和精灵动画渲染。
4. 实现文字渲染。
5. 实现文字渲染的优化（合并texture并自动分配空间）。
6. 抽离成单独组件做为依赖出现，并提供starter-kit。
7. 实现资源主动/异步加载。
8. 最佳实践和性能优化的探索。
9. 不支持WebGL的环境退化到Canvas 2D渲染。

目前有这么几件事情暂时不打算干：

1. state的支持。暂时可以用mobx或forceUpdate()来取代。
2. context的支持。所以暂时也用不了redux。
3. PropTypes检查。这个等功能方面稳定了再考虑补回来。
4. 3D的支持。理论上可行然而这个会带来巨大的工作量，晚一点再考虑。
5. react event的一部分特性，尤其是preventDefault()。这里在需要的时候打算通过自定义组件在主脚本线程去处理这些事。
6. 彻底封装封闭主线程。这个组件的设计目标是你很可能需要写一部分代码在主线程运行，包括手势识别、复杂的对象、物理计算等等。仅仅是业务驱动在Worker中编写。

预期的目标代码大概是这么玩

```javascript

class Player {
    @observable
    name = '艾尔';

    @observable
    sprite = 'eyer';

    @observable
    hp = 100;

    @observable
    maxHp = 100;

    @observable
    x = 0;

    @observable
    y = 0;
}

@observer
class Progress extends Component {
    render() {
        const { target, field, maxField } = this.props;
        const value = target[field];
        const maxValue = target[maxField];
        return (
            <gl-node2d>
                <gl-rect x={-50} y={-5} width={100} height={10} />
                <gl-
            </gl-node2d>
        );
    }
}

@observer
class PlayerComp extends Component {
    player = new Player();

    render() {
        return (
            <gl-node2d translateX={this.player.x} translayteY={this.player.y}>
                <Sprite resource={this.player.sprite} animation="stand"/>
                <gl-node2d translayteY={-120}>
                    <Progress target={this.player} field="hp" maxField="maxHp" />
                </gl-node2d>
                <gl-node2d translayteY={-100}>
                    <Text>{this.player.name}</Text>
                </gl-node2d>
            </gl-node2d>
        );
    }
}

@observer
class Game extends Component {
    componentDidMount() {
        // Scene的子节点通过方法动态加入，避免过于繁重的比对。
        this.refs.scene.addNode(<PlayerComp />);
    }

    render() {
        return (
            <GameScene ref="scene" />
        );
    }
}
```
