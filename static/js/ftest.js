window.onload = function() {
    "use strict";
    var iWidth = 1000;
    var barMargin = 5;
    var scaleVal = 1;
    var imageObj = new Image();
    var systems = [];
    var minBar = 18;
    
    /*
    function getSubStaffByNumber(group, number) {
        var staves = group.get(".substaff");
        var i;
        for (i = 0; i < group.attrs.staves; i++) {
            if (staves[i].attrs.number == number) {
                return staves[i];
            }
        }
        return null;
    }
    
    function updateMultiStaffGroup(group, activeAnchor) {
        var lockY = false;
        var topLeft = group.get(".1")[0];
        var topRight = group.get(".2")[0];
        var bottomRight = group.get(".3")[0];
        var bottomLeft = group.get(".4")[0];
        
        var staff = group.get(".multistaffframe")[0];
        var iBox = group.get(".multistaffbox")[0];
        topLeft.attrs.visible = true;
        topRight.attrs.visible = true;
        bottomRight.attrs.visible = true;
        bottomLeft.attrs.visible = true;
        
        switch (activeAnchor.getName()) {
            case "1":
                if (group.attrs.staves > 1) {
                    var s0 = getSubStaffByNumber(group, 0);
                    var s1 = getSubStaffByNumber(group, 1);
                    var s0Staff = s0.get(".firststaff")[0];
                    if (s1.getAbsolutePosition().y <= (topLeft.getAbsolutePosition().y + s0Staff.getHeight()) + 5) {
                        topLeft.setAbsolutePosition({
                            x: topLeft.getAbsolutePosition().x,
                            y: s1.getAbsolutePosition().y - s0Staff.getHeight() - 5
                        });
                    }
                }
                topRight.attrs.y = activeAnchor.attrs.y;
                bottomLeft.attrs.x = activeAnchor.attrs.x;
                break;
            case "2":
                if (group.attrs.staves > 1) {
                    var s0 = getSubStaffByNumber(group, 0);
                    var s1 = getSubStaffByNumber(group, 1);
                    var s0Staff = s0.get(".firststaff")[0];
                    if (s1.getAbsolutePosition().y <= (topRight.getAbsolutePosition().y + s0Staff.getHeight()) + 5) {
                        topRight.setAbsolutePosition({
                            x: topRight.getAbsolutePosition().x,
                            y: s1.getAbsolutePosition().y - s0Staff.getHeight() - 5
                        });
                    }
                }
                topLeft.attrs.y = activeAnchor.attrs.y;
                bottomRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "3":
                if (group.attrs.staves > 1) {
                    var s0 = getSubStaffByNumber(group, group.attrs.staves - 1);
                    var s1 = getSubStaffByNumber(group, group.attrs.staves - 2);
                    var s0Staff = s0.get(".staff")[0];
                    if (s1.getAbsolutePosition().y <= (bottomLeft.getAbsolutePosition().y + s0Staff.getHeight()) + 5) {
                        topRight.setAbsolutePosition({
                            x: topRight.getAbsolutePosition().x,
                            y: s1.getAbsolutePosition().y - s0Staff.getHeight() - 5
                        });
                    }
                }
                bottomLeft.attrs.y = activeAnchor.attrs.y;
                topRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "4":
                bottomRight.attrs.y = activeAnchor.attrs.y;
                topLeft.attrs.x = activeAnchor.attrs.x;
                break;
        }
        
        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = bottomLeft.attrs.y - topLeft.attrs.y;
        var substaves = group.get(".substaff");
        var i;
        for (i = 0; i < substaves.length; i++) {
            var substaff = substaves[i];
            var sIBox = substaff.get(".staffbox")[0];
            var first = substaff.get(".firststaff");
            var last = substaff.get(".laststaff");
            var currStaff = null;
            if (first.length == 1) {
                currStaff = first[0];
                substaff.setPosition(topLeft.attrs.x + 5, topLeft.attrs.y + 5);
            } else if (last.length == 1) {
                currStaff = last[0];
                substaff.setPosition(bottomLeft.attrs.x + 5, bottomLeft.attrs.y - 5 - currStaff.getHeight());
            } else {
                currStaff = substaff.get(".staff")[0];
                substaff.setX(topLeft.attrs.x + 5);
            }
            currStaff.setWidth(width - 10);
            sIBox.setWidth(width);
            
            var number = currStaff.attrs.number;
            var tr = substaff.get("." + (number * 4 + 2))[0];
            var br = substaff.get("." + (number * 4 + 3))[0];
            
            tr.attrs.x = currStaff.getWidth();
            br.attrs.x = currStaff.getWidth();
        }

        var lines = group.get(".line");
        for (i = 0; i < lines.length; i++) {
            lines[i].setY(topLeft.attrs.y);
            lines[i].setHeight(height);
            if (lines[i].getX() > width) {
                topRight.attrs.x = lines[i].getX();
                bottomRight.attrs.x = topRight.attrs.x;
                width = lines[i].getX();
            } else if (lines[i].getX() < topLeft.attrs.x) {
                topLeft.attrs.x = lines[i].getX();
                bottomLeft.attrs.x = topLeft.attrs.x;
                width = topRight.attrs.x - topLeft.attrs.x;
            }
        }
        staff.setPosition(topLeft.attrs.x + 5, topLeft.attrs.y + 5);
        iBox.setPosition(topLeft.attrs.x - 5, topLeft.attrs.y - 5);
        if(width && height) {
            staff.setSize(width - 10, height - 10);
            iBox.setSize(width + 10, height + 10);
        }
    }
    
    function updateSubStaff(group, activeAnchor) {
        var superGroup = group.getParent();
        var first = group.get(".firststaff");
        var last = group.get(".laststaff");
        var isFirst = false;
        var isLast = false;
        
        var staff = null;
        
        if (first.length == 1) {
            isFirst = true;
            staff = first[0];
        } else if (last.length == 1) {
            isLast = true;
            staff = last[0];
        } else {
            staff = group.get(".staff")[0];
        }
        
        var number = staff.attrs.number;
        
        var topLeft = group.get("." + (number * 4 + 1))[0];
        var topRight = group.get("." + (number * 4 + 2))[0];
        var bottomRight = group.get("." + (number * 4 + 3))[0];
        var bottomLeft = group.get("." + (number * 4 + 4))[0];
        
        var iBox = group.get(".staffbox")[0];
        topLeft.attrs.visible = true;
        topRight.attrs.visible = true;
        bottomRight.attrs.visible = true;
        bottomLeft.attrs.visible = true;
        
        switch (activeAnchor.getName()) {
            case number * 4 + 1:
                topRight.attrs.y = activeAnchor.attrs.y;
                bottomLeft.attrs.x = activeAnchor.attrs.x;
                break;
            case number * 4 + 2:
                topLeft.attrs.y = activeAnchor.attrs.y;
                bottomRight.attrs.x = activeAnchor.attrs.x;
                break;
            case number * 4 + 3:
                bottomLeft.attrs.y = activeAnchor.attrs.y;
                topRight.attrs.x = activeAnchor.attrs.x;
                break;
            case number * 4 + 4:
                bottomRight.attrs.y = activeAnchor.attrs.y;
                topLeft.attrs.x = activeAnchor.attrs.x;
                break;
        }
        
        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = bottomLeft.attrs.y - topLeft.attrs.y;
        
        //group.setPosition(topLeft.attrs.x, topLeft.attrs.y);
        staff.setPosition(topLeft.attrs.x, topLeft.attrs.y);
        iBox.setPosition(topLeft.attrs.x - 5, topLeft.attrs.y - 5);
        if(width && height) {
            staff.setSize(width, height);
            iBox.setSize(width + 10, height + 10);
        }
    }
    
    function updateStaff(group, activeAnchor) {
        var topLeft = group.get(".1")[0];
        var topRight = group.get(".2")[0];
        var bottomRight = group.get(".3")[0];
        var bottomLeft = group.get(".4")[0];
        var staff = group.get(".staff")[0];
        var iBox = group.get(".staffbox")[0];
        topLeft.attrs.visible = true;
        topRight.attrs.visible = true;
        bottomRight.attrs.visible = true;
        bottomLeft.attrs.visible = true;
        // update anchor positions
        switch (activeAnchor.getName()) {
            case "1":
                topRight.attrs.y = activeAnchor.attrs.y;
                bottomLeft.attrs.x = activeAnchor.attrs.x;
                break;
            case "2":
                topLeft.attrs.y = activeAnchor.attrs.y;
                bottomRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "3":
                bottomLeft.attrs.y = activeAnchor.attrs.y;
                topRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "4":
                bottomRight.attrs.y = activeAnchor.attrs.y;
                topLeft.attrs.x = activeAnchor.attrs.x;
                break;
        }
    
        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = bottomLeft.attrs.y - topLeft.attrs.y;
    
        var lines = group.get(".line");
        var i;
        for (i = 0; i < lines.length; i++) {
            lines[i].setY(topLeft.attrs.y);
            lines[i].setHeight(height);
            if (lines[i].getX() > width) {
                topRight.attrs.x = lines[i].getX();
                bottomRight.attrs.x = topRight.attrs.x;
                width = lines[i].getX();
            } else if (lines[i].getX() < topLeft.attrs.x) {
                topLeft.attrs.x = lines[i].getX();
                bottomLeft.attrs.x = topLeft.attrs.x;
                width = topRight.attrs.x - topLeft.attrs.x;
            }
        }
        staff.setPosition(topLeft.attrs.x, topLeft.attrs.y);
        iBox.setPosition(topLeft.attrs.x - 5, topLeft.attrs.y - 5);
        if(width && height) {
            staff.setSize(width, height);
            iBox.setSize(width + 10, height + 10);
        }
    }
    
    function update(group, activeAnchor) {
        if (group.getName() == "multistaffgroup") {
            updateMultiStaffGroup(group, activeAnchor);
        } else if (group.getName() == "substaff") {
            updateSubStaff(group, activeAnchor)
        } else {
            updateStaff(group, activeAnchor);
        }
    }
    
    function addAnchor(group, iBox, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();
        var superGroup = null;
        if (group.getName() == "substaff") {
            superGroup = group.getParent();
        }

        var anchor = new Kinetic.Circle({
            x: x,
            y: y,
            stroke: "#666",
            fill: "#ddd",
            strokeWidth: 2,
            radius: 3,
            name: name,
            draggable: true,
            visible: false
        });

        anchor.on("dragmove", function() {
            update(group, this);
            layer.draw();
        });
        anchor.on("mousedown touchstart", function(e) {
            group.setDraggable(false);
            this.moveToTop();
            e.cancelBubble = true;
        });
        anchor.on("dragend", function() {
            group.setDraggable(true);
            layer.draw();
        });
        // add hover styling
        anchor.on("mouseover", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "pointer";
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on("mouseout", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "default";
            this.setStrokeWidth(2);
            layer.draw();
        });
        if (superGroup !== null) {
            superGroup.on("dragmove", function(e) {
                anchor.attrs.visible = true;
                anchor.getLayer().draw();
            });
            superGroup.on("mouseout", function() {
                anchor.attrs.visible = false;
                anchor.getLayer().draw();
            });
        }
        group.on("mouseover dragmove", function() {
            anchor.attrs.visible = true;
            anchor.getLayer().draw();
        });
        group.on("mouseout", function() {
            anchor.attrs.visible = false;
            anchor.getLayer().draw();
        });
        group.add(anchor);
    }
    
    function addLine(stage, group, x, y, height) {
        var line = new Kinetic.Rect({
            x: x - group.getX() - 0.5,
            y: y,
            width: 2,
            height: height,
            fill: 'black',
            name: "line"
        });
        line.on("mousedown", function(evt) {
            stage.on("mousemove", function(e) {
                var pos = stage.getMousePosition(e);
                var pX = pos.x;
                var staff = group.get(".staff")[0];
                var newPos = pX - group.getX() - 0.5;
                if (newPos < ( staff.getX() + staff.getWidth()) && newPos > staff.getX()) {
                    line.setX(newPos);
                } else if (newPos > ( staff.getX() + staff.getWidth())) {
                    newPos = staff.getWidth();
                } else {
                    newPos = 0;
                }
                line.getLayer().draw();
            });
            stage.on("mouseup", function() {
                stage.off("mousemove");
                stage.off("mouseup");
            });
            evt.cancelBubble = true;
        });
        line.on("click", function(e) {
            if (e.altKey) {
                group.remove(line);
                group.getLayer().draw();
            }
        });
        group.add(line);
    }
        
    function addStaff(stage, tl, br, lines) {
        if (lines === undefined) {
            lines = [];
        }
        
        var sWidth = br.x - tl.x;
        var sHeight = br.y - tl.y;
        
        var sGroup = new Kinetic.Group({
            x: tl.x,
            y: tl.y,
            draggable: true,
            name: "staffgroup"
        });
        
        var sLayer = new Kinetic.Layer();
        sLayer.add(sGroup);
        
        var invisiBox = new Kinetic.Rect({
            x: -5,
            y: -5,
            width: sWidth + 10,
            height: sHeight + 10,
            fill: 'red',
            alpha: 0.2,
            name: "staffbox"
        });
        sGroup.add(invisiBox);

        var staff = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: sWidth,
            height: sHeight,
            fill: '',
            stroke: 'black',
            strokewidth: 4,
            name: "staff"
        });
        sGroup.add(staff);
        
        staff.on("click", function(e) {
            if (e.shiftKey) {
                var pos = stage.getMousePosition(e);
                var pX = pos.x;
                addLine(stage, sGroup, pX, staff.getY(), staff.getHeight());
                sGroup.getLayer().draw();
            }
        });
        
        var i;
        for (i = 0; i < lines.length; i++) {
            addLine(stage, sGroup, lines[i], 0, sHeight);
        }
        
        addAnchor(sGroup, invisiBox, 0, 0, "1");
        addAnchor(sGroup, invisiBox, sWidth, 0, "2");
        addAnchor(sGroup, invisiBox, sWidth, sHeight, "3");
        addAnchor(sGroup, invisiBox, 0, sHeight, "4");
        
        stage.add(sLayer);
    }
    
    function addStaffBox (group, tl, br, number, total) {
        
        var sGroup = new Kinetic.Group({
            x: tl.x,
            y: tl.y,
            name: "substaff",
            number: group.attrs.staves
        });
        
        group.add(sGroup);
        group.attrs.staves++;
        
        var sWidth = br.x - tl.x;
        var sHeight = br.y - tl.y;
        
        var sInvisiBox = new Kinetic.Rect({
            x: -5,
            y: -5,
            width: sWidth + 10,
            height: sHeight + 10,
            fill: 'yellow',
            name: "staffbox"
        });
        sGroup.add(sInvisiBox);

        var staff = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: sWidth,
            height: sHeight,
            fill: '',
            stroke: 'black',
            strokewidth: 4,
            name: "staff",
            number: number
        });
        
        if (number == 1) {
            staff.setName("firststaff");
        } else if (number == total) {
            staff.setName("laststaff");
        }
        
        sGroup.add(staff);
        addAnchor(sGroup, sInvisiBox, 0, 0, number * 4 + 1);
        addAnchor(sGroup, sInvisiBox, sWidth, 0, number * 4 + 2);
        addAnchor(sGroup, sInvisiBox, sWidth, sHeight, number * 4 + 3);
        addAnchor(sGroup, sInvisiBox, 0, sHeight, number * 4 + 4);
    }
    
    function addMultiStaff (stage, tl, br, staffEdges, lines) {
        if (staffEdges.length % 2 !== 0 || staffEdges.length == 0) {
            return "Badly formed arguments";
        }
        var nStaves = (staffEdges.length / 2) + 1;
        if (lines === undefined) {
            lines = [];
        }
        
        var msWidth = br.x - tl.x;
        var msHeight = br.y - tl.y;
        
        var msGroup = new Kinetic.Group({
            x: tl.x,
            y: tl.y,
            draggable: true,
            name: "multistaffgroup",
            staves: 0
        });
        
        var msLayer = new Kinetic.Layer();
        msLayer.add(msGroup);
        
        var invisiBox = new Kinetic.Rect({
            x: -10,
            y: -10,
            width: msWidth + 20,
            height: msHeight + 20,
            fill: 'green',
            name: "multistaffbox"
        });
        msGroup.add(invisiBox);
        
        var staffFrame = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: msWidth,
            height: msHeight,
            fill: '',
            stroke: 'black',
            strokewidth: 4,
            name: "multistaffframe"
        });
        msGroup.add(staffFrame);
        
        
        var i, staffTL, staffBR;
        for (i = 1; i <= nStaves; i++) {
            if (i == 1) {
                staffTL = {
                    x: 0,
                    y: 0
                };
            } else {
                staffTL = {
                    x: 0,
                    y: staffEdges[(2 * i) - 3]
                };
            } 
            if (i == nStaves) {
                staffBR = {
                    x: msWidth,
                    y: msHeight
                };
            } else {
                staffBR = {
                    x: msWidth,
                    y: staffEdges[(2 * i) - 2]
                };
            }
            addStaffBox(msGroup, staffTL, staffBR, i, nStaves);
        }
        
        addAnchor(msGroup, invisiBox, -5, -5, "1");
        addAnchor(msGroup, invisiBox, msWidth+5, -5, "2");
        addAnchor(msGroup, invisiBox, msWidth+5, msHeight+5, "3");
        addAnchor(msGroup, invisiBox, -5, msHeight+5, "4");
        
        stage.add(msLayer);
    }
    
    */
    
    // Returns the system with the given id tag
    function getSystemById(id) {
        var i;
        for (i = 0; i < systems.length; i++) {
            if (systems[i].attrs.id === id) {
                return systems[i];
            }
        }
        return null;
    }
    
    // Finds the nearest system to a given bar
    function findNearestSystem(barGroup) {
        var bar = barGroup.get(".bar")[0];
        var top = bar.getAbsolutePosition().y;
        var lower = top + bar.getHeight();
        
        var i;
        // Check the corners to see if any are contained in the bar
        for (i = 0; i < systems.length; i++) {
            if (((top > systems[i].getY()) &&
                 (top < systems[i].getY() + systems[i].attrs.height)) ||
                ((top > systems[i].getY()) &&
                 (top < systems[i].getY() + systems[i].attrs.height)) ||
                ((lower > systems[i].getY()) &&
                 (lower < systems[i].getY() + systems[i].attrs.height)) ||
                ((lower > systems[i].getY()) &&
                 (lower < systems[i].getY() + systems[i].attrs.height))) {
                return systems[i];
            }
        }
        // Find shortest corner distance to a system
        var distances = [];
        for (i = 0; i < systems.length; i++) {
            distances[4 * i] = Math.abs(top - systems[i].getY());
            distances[(4 * i) + 1] = Math.abs(top - (systems[i].getY() + systems[i].attrs.height));
            distances[(4 * i) + 2] = Math.abs(lower - systems[i].getY());
            distances[(4 * i) + 3] = Math.abs(lower - (systems[i].getY() + systems[i].attrs.height));
        }
        
        var minDist = Math.min.apply(Math, distances);
        
        for (i = 0; i < distances.length; i++) {
            if (distances[i] === minDist) {
                return systems[Math.floor(i / 4)];
            }
        }
        return null;
    }
    
    // Find the nearest system to a given y-coordinate
    function findNearestSystemToPoint(y) {
        var distances = [];
        var i;
        for (i = 0; i < systems.length; i++) {
            distances[2 * i] = Math.abs(y - systems[i].getY());
            distances[(2 * i) + 1] = Math.abs(y - (systems[i].getY() + systems[i].attrs.height));
        }
        
        var minDist = Math.min.apply(Math, distances);
        
        for (i = 0; i < distances.length; i++) {
            if (distances[i] === minDist) {
                return systems[Math.floor(i / 2)];
            }
        }
        return null;
    }
    
    // Resize/relocate a system to correctly bound its bars
    function resizeSystem(system) {
        var bars = system.getLayer().get(".bar");
        var tlx = -1;
        var tly = -1;
        var lrx = -1;
        var lry = -1;
        var i;
        for (i = 0; i < bars.length; i++) {
            var barPos = bars[i].getAbsolutePosition();
            
            var rightX = barPos.x + bars[i].getWidth();
            var lowerY = barPos.y + bars[i].getHeight();
            if (tlx === -1 || barPos.x < tlx) {
                tlx = barPos.x;
            }
            if (tly === -1 || barPos.y < tly) {
                tly = barPos.y;
            }
            if (lrx === -1 || rightX > lrx) {
                lrx = rightX;
            }
            if (lry === -1 || lowerY > lry) {
                lry = lowerY;
            }
        }
        
        system.attrs.x = tlx;
        system.attrs.y = tly;
        system.attrs.width = lrx - tlx;
        system.attrs.height = lry - tly;
        /*
        var tBox = system.get(".testbox")[0];
        tBox.setAbsolutePosition({
            x: tlx,
            y: tly
        });
        tBox.setWidth(lrx - tlx);
        tBox.setHeight(lry - tly);*/
        system.getLayer().draw();
    }
    
    function updateNumbers() {
        var currentNumber = minBar;
        var i, j, changed;
        for (i = 0; i < systems.length; i++) {
            systems[i].attrs.bars = systems[i].attrs.bars.sort(function(a, b) { return a.getX() - b.getX()});
            changed = false;
            for (j = 0; j < systems[i].attrs.bars.length; j++) {
                if (systems[i].attrs.bars[j].attrs.number !== currentNumber) {
                    changed = true;
                    systems[i].attrs.bars[j].attrs.number = currentNumber;
                    var barNumber = systems[i].attrs.bars[j].get(".barnumber")[0];
                    barNumber.setText(currentNumber.toString());
                }
                currentNumber++;
            }
            if (changed) {
                systems[i].getLayer().draw();
            }
        }
    }
    
    // Update a bar when an anchor is moved
    function update(group, activeAnchor) {
        var topLeft = group.get(".tl")[0];
        var topRight = group.get(".tr")[0];
        var lowerRight = group.get(".lr")[0];
        var lowerLeft = group.get(".ll")[0];
        var bar = group.get(".bar")[0];
        var iBox = group.get(".barbox")[0];
        topLeft.attrs.visible = true;
        topRight.attrs.visible = true;
        lowerRight.attrs.visible = true;
        lowerLeft.attrs.visible = true;
        // update anchor positions
        switch (activeAnchor.getName()) {
            case "tl":
                topRight.attrs.y = activeAnchor.attrs.y;
                lowerLeft.attrs.x = activeAnchor.attrs.x;
                break;
            case "tr":
                topLeft.attrs.y = activeAnchor.attrs.y;
                lowerRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "lr":
                lowerLeft.attrs.y = activeAnchor.attrs.y;
                topRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "ll":
                lowerRight.attrs.y = activeAnchor.attrs.y;
                topLeft.attrs.x = activeAnchor.attrs.x;
                break;
        }
    
        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = lowerLeft.attrs.y - topLeft.attrs.y;
    
        bar.setPosition(topLeft.attrs.x, topLeft.attrs.y);
        iBox.setPosition(topLeft.attrs.x - 5, topLeft.attrs.y - 5);
        if(width && height) {
            bar.setSize(width, height);
            iBox.setSize(width + 10, height + 10);
        }
    }
    
    function refitBox(bGroup) {
        var topLeft = bGroup.get(".tl")[0];
        var topRight = bGroup.get(".tr")[0];
        var lowerRight = bGroup.get(".lr")[0];
        var lowerLeft = bGroup.get(".ll")[0];
        var bar = bGroup.get(".bar")[0];
        var iBox = bGroup.get(".barbox")[0];
        var barNumber = bGroup.get(".barnumber")[0];
        
        var tlPos = topLeft.getAbsolutePosition();
        var lrPos = lowerRight.getAbsolutePosition();
        
        var width = lrPos.x - tlPos.x;
        var height = lrPos.y - tlPos.y;
        
        bGroup.setPosition({
            x: tlPos.x,
            y: tlPos.y
        });
        barNumber.setPosition({
            x: 0,
            y: 0
        });
        bar.setPosition({
            x: 0,
            y: 0
        });
        iBox.setPosition({
            x: -barMargin,
            y: -barMargin
        });
        topLeft.setPosition({
            x: 0,
            y: 0
        });
        topRight.setPosition({
            x: width,
            y: 0
        });
        lowerRight.setPosition({
            x: width,
            y: height
        });
        lowerLeft.setPosition({
            x: 0,
            y: height
        });
        bar.setWidth(width);
        bar.setHeight(height);
        iBox.setWidth(width + (barMargin * 2));
        iBox.setHeight(height + (barMargin * 2));
    }
    
    // Add an anchor to a bar
    function addAnchor(group, iBox, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();

        var anchor = new Kinetic.Circle({
            x: x,
            y: y,
            stroke: "#666",
            fill: "#ddd",
            strokeWidth: 2,
            radius: 3,
            name: name,
            draggable: true,
            visible: false
        });

        anchor.on("dragmove", function() {
            update(group, this);
            layer.draw();
        });
        anchor.on("mousedown touchstart", function(e) {
            group.setDraggable(false);
            this.moveToTop();
            e.cancelBubble = true;
            var number = group.get(".barnumber")[0];
            number.attrs.visible = false;
        });
        anchor.on("dragend", function() {
            resizeSystem(group.getParent().get(".system")[0]);
            group.setDraggable(true);
            updateNumbers();
            refitBox(group);
            var number = group.get(".barnumber")[0];
            number.attrs.visible = true;
            layer.draw();
        });
        // add hover styling
        anchor.on("mouseover", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "pointer";
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on("mouseout", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "move";
            this.setStrokeWidth(2);
            layer.draw();
        });
        group.on("mouseover dragmove", function() {
            anchor.attrs.visible = true;
            anchor.getLayer().draw();
        });
        group.on("mouseout", function() {
            anchor.attrs.visible = false;
            anchor.getLayer().draw();
        });
        group.add(anchor);
    }
    
    // Add a bar to a system
    function addBar(stage, system, x, y, w, h, number) {
        var bGroup = new Kinetic.Group({
            x: x,
            y: y,
            draggable: true,
            name: "bargroup",
            number: number
        });
        
        var i = 0;
        for (i = 0; i < system.children.length; i++) {
            if (system.children[i].getX() > x) {
                system.attrs.bars.splice(i, 0, bGroup);
                break;
            }
        }
        if (i == system.children.length) {
            system.attrs.bars.push(bGroup);
        }
        
        system.add(bGroup);
        
        var invisiBox = new Kinetic.Rect({
            x: -barMargin,
            y: -barMargin,
            width: w + (barMargin * 2),
            height: h + (barMargin * 2),
            fill: 'orange',
            alpha: 0.05,
            name: "barbox"
        });
        bGroup.add(invisiBox);
        
        var barText = new Kinetic.Text({
            x: 0,
            y: 0,
            fontSize: 15,
            fontFamily: "Calibri",
            textFill: "white",
            fill: 'black',
            text: number.toString(),
            align: 'center',
            padding: 3,
            name: "barnumber"
        });
        
        bGroup.add(barText);

        var bar = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: w,
            height: h,
            fill: '',
            stroke: 'red',
            strokewidth: 4,
            name: "bar"
        });
        
        bar.on("click", function(e) {
            if (e.shiftKey) {
                var pos = stage.getMousePosition(e);
                var absBarPos = bar.getAbsolutePosition();
                var leftWidth = pos.x - absBarPos.x;
                var rightWidth = absBarPos.x + bar.getWidth() - pos.x;
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                addBar(stage, system, absBarPos.x, absBarPos.y, leftWidth, bar.getHeight(), 0);
                addBar(stage, system, pos.x, absBarPos.y, rightWidth, bar.getHeight(), 0);
                updateNumbers();
            }
        });
        
        
        
        bGroup.add(bar);
        
        bGroup.on("mouseover", function() {
            this.moveToTop();
            document.body.style.cursor = "move";
        });
        bGroup.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        bGroup.on("click", function(e) {
            if (e.altKey) {
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                updateNumbers();
                resizeSystem(system);
            }
        });
        bGroup.on("dragend", function(e) {
            //Recalculate system membership, and system size
            var nearSystem = findNearestSystem(this);
            if (nearSystem !== system) {
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                addBar(stage, nearSystem, bGroup.getX(), bGroup.getY(), bar.getWidth(), bar.getHeight(), 0);
                resizeSystem(system);
            }
            updateNumbers();
            resizeSystem(nearSystem);
            system.getLayer().draw();
            system = nearSystem;
        });
        
        addAnchor(bGroup, invisiBox, 0, 0, "tl");
        addAnchor(bGroup, invisiBox, w, 0, "tr");
        addAnchor(bGroup, invisiBox, w, h, "lr");
        addAnchor(bGroup, invisiBox, 0, h, "ll");
        
        system.getLayer().add(bGroup);
    }
    
    imageObj.onload = function () {
        var scaleVal = iWidth / imageObj.width;
        
        var stage = new Kinetic.Stage({
            container: 'imview',
            width: iWidth,
            height: imageObj.height * scaleVal
        });
        
        var scaleVal = iWidth / imageObj.width;
        
        var img = new Kinetic.Image({
            x: 0,
            y: 0,
            width: iWidth,
            height: imageObj.height * scaleVal,
            image: imageObj
        });
        
        var iLayer = new Kinetic.Layer();
        iLayer.add(img);
        stage.add(iLayer);
        
        /*
        var tl = {
            x: 50,
            y: 50
        };
        var br = {
            x: 350,
            y: 220
        };
        var lines = [];
        lines[0] = 70;
        lines[1] = 100;
        
        var staffEdges = [];
        staffEdges[0] = 50;
        staffEdges[1] = 75;
        staffEdges[2] = 105;
        staffEdges[3] = 130;
        addMultiStaff(stage, tl, br, staffEdges, lines);
        //addStaff(stage, tl, br, lines);
        */
        
        $.get('static/mei/detmoldbars.mei', function(data) {
            var meiDoc = $.parseXML(data);
            var mei = $(meiDoc);
            var barNumber = minBar;
            mei.find("system").each(function() {
                var facs = $(this).attr("facs");
                var zone = mei.find('[xml\\:id="' + facs + '"]');
                systems.push(new Kinetic.Group({
                    x: zone.attr("ulx") * scaleVal,
                    y: zone.attr("uly") * scaleVal,
                    width: (zone.attr("lrx") - zone.attr("ulx")) * scaleVal,
                    height: (zone.attr("lry") - zone.attr("uly")) * scaleVal,
                    facs: facs,
                    id: $(this).attr("xml:id"),
                    name: "system",
                    bars: []
                }));
                
                /*
                var nBox = new Kinetic.Rect({
                    x: zone.attr("ulx") * scaleVal,
                    y: zone.attr("uly") * scaleVal,
                    width: (zone.attr("lrx") - zone.attr("ulx")) * scaleVal,
                    height: (zone.attr("lry") - zone.attr("uly")) * scaleVal,
                    fill: 'yellow',
                    name: 'testbox'
                });
                systems[systems.length - 1].add(nBox);
                nBox.setAbsolutePosition({
                    x: zone.attr("ulx") * scaleVal,
                    y: zone.attr("uly") * scaleVal
                });*/
            });
            
            var i;
            for (i = 0; i < systems.length; i++) {
                var layer = new Kinetic.Layer();
                layer.add(systems[i]);
                stage.add(layer);
            }
            
            var currSystem = null;
            var prevX = 0;
            var prevY = 0;
            mei.find("layer").children().each(function() {
                if ($(this).is("sb")) {
                    var systemref = $(this).attr("systemref");
                    currSystem = getSystemById(systemref);
                    prevX = currSystem.getX();
                    prevY = currSystem.getY();
                } else if (currSystem !== null) {
                    var facs = $(this).attr("facs");
                    var zone = mei.find('[xml\\:id="' + facs + '"]');
                    var width = (zone.attr("lrx") * scaleVal) - prevX;
                    var height = (zone.attr("lry") * scaleVal) - prevY;
                    
                    addBar(stage, currSystem, prevX, prevY, width, height, barNumber++);
                    
                    prevX += width;
                    prevY = (zone.attr("uly") * scaleVal);
                }
            });
            stage.draw();
        });
        
        img.on("click", function(e) {
            if (e.shiftKey) {
                //Add new bar, 25x25, calculate system membership
                var pos = stage.getMousePosition(e);
                var nearSystem = findNearestSystemToPoint(pos.y);
                addBar(stage, nearSystem, pos.x, pos.y, 25, 25, 0);
                resizeSystem(nearSystem);
                updateNumbers();
            }
        });
        img.on("mouseover", function() {
            document.body.style.cursor = "default";
        });
        
    };
    imageObj.src = 'static/images/detmoldbars.jpg';
};
