using System;
using System.Collections.Generic;

public class QuantumDecoder
{
    public string ActiveChannel { get; set; }
    public int QuantumLevel { get; set; }

    public QuantumDecoder()
    {
        ActiveChannel = "";
        QuantumLevel = 5;
    }

    public void ActivateChannel(string channel)
    {
        ActiveChannel = channel;
    }

    public void ResetQuantum() {}

    public void DeactivateChannel()
    {
        ActiveChannel = "";
    }
}

class Program
{
    static void Main()
    {
        QuantumDecoder qd = new QuantumDecoder();
        qd.ActivateChannel("Stream_01");
        qd.ResetQuantum();
        qd.DeactivateChannel();
    }
}
